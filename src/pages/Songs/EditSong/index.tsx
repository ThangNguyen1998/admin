import React, { useState } from 'react';
import _ from 'lodash';
import styles from './styles.module.scss';
import { useTranslation } from 'react-i18next';
import { Button, Checkbox, Form, Input, message, Spin, Table } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import ChordSheetJS from 'chordsheetjs';
import { useQuery } from 'react-query';
import { addSong, getSongDetail, updateDetailSong } from 'api/accounts';

export default function EditSong(props: any) {
  const { t } = useTranslation();
  const { TextArea } = Input;
  const history = useHistory();
  const [form] = Form.useForm();
  const id = props?.match?.params?.id;
  const { data: song, refetch: refetchSong, isLoading, isFetching } = useQuery(
    ['song', { id: id }],
    () => getSongDetail(id),
    {
      refetchOnWindowFocus: false,
    }
  );
  const { name: songName } = song || {};
  form.setFieldsValue({
    lyrics: song?.lyric,
    song_name: songName,
    artist_name: song?.author,
    author_name: song?.artistName,
  });

  const handleOnChange = (value: any) => {};
  const handleFinish = async (values: any) => {
    try {
      const payload = {
        songId: id,
        artistName: values.artist_name,
        author: values.author_name,
        name: values.song_name,
        lyric: values.lyrics,
      };
      if (id) {
        await updateDetailSong(payload);
      } else {
        delete payload.songId;
        await addSong(payload);
        history.push('/songs');
      }
      refetchSong();
    } catch (error: any) {
      message.error(error);
    }
  };

  return (
    <div className={styles.listAccount}>
      <div className={styles.back}>
        <LeftOutlined onClick={() => history.push('/songs')} />
        <span>Back to list songs</span>
      </div>
      <Spin spinning={isLoading || isFetching}>
        <Form
          className={styles.form}
          onValuesChange={handleOnChange}
          form={form}
          onFinish={handleFinish}>
          <Form.Item
            name="song_name"
            label="Name of song"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}>
            <Input />
          </Form.Item>
          <Form.Item
            name="artist_name"
            label="Name of artist"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}>
            <Input />
          </Form.Item>
          <Form.Item
            name="author_name"
            label="Name of author"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}>
            <Input />
          </Form.Item>
          <Form.Item
            name="lyrics"
            label="Lyrics"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}>
            <TextArea className={styles.textarea} autoSize={true} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {id ? 'Edit' : 'Add'}
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
}
