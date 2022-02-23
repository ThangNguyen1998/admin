/*eslint no-restricted-globals: ["error", "event"]*/
import React, { useState } from 'react';
import _ from 'lodash';
import styles from './styles.module.scss';
import { useTranslation } from 'react-i18next';
import { Button, Checkbox, Input, message, Spin, Table } from 'antd';
import iconDeleteBlack from '../../assets/images/delete.png';
import iconEditBlack from '../../assets/images/edit.png';
import iconView from '../../assets/images/open.svg';
import DeleteSong from './DeleteSong';
import { useHistory } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getListSong, updateSong } from 'api/accounts';

export default function Songs() {
  const { t } = useTranslation();
  const { Search } = Input;
  const history = useHistory();
  const [deleteStatus, setDeleteStatus] = useState(false);
  const [idPicked, setIdPicked] = useState<number>();
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Author',
      dataIndex: 'artistName',
      key: 'artistName' || '',
    },
    {
      title: 'Artist Name',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text: any, record: any) => (
        <label className={`switch`}>
          <Checkbox
            className={`checkbox-custom`}
            checked={record?.status == 1}
            onChange={(e) => onOffSong(e, record?.songId)}>
            <span className={`slider`}></span>
          </Checkbox>
        </label>
      ),
    },
    {
      title: '',
      dataIndex: '',
      key: '',
      render: (text: any, record: any) => {
        return (
          <div className={styles.btnGroup}>
            <Button
              className={`${styles.btnAction}`}
              onClick={() => history.push(`/song/detail/${record.songId}`)}
              disabled={!(record?.status == 1)}>
              <img src={iconView} alt="" />
            </Button>
            <Button
              className={`${styles.btnAction}`}
              onClick={() => history.push(`/song/edit/${record.songId}`)}
              disabled={!(record?.status == 1)}>
              <img src={iconEditBlack} alt="" />
            </Button>
            {/* <Button
              className={`${styles.btnAction}`}
              onClick={() => deleteSong(record.id)}>
              <img src={iconDeleteBlack} alt="" />
            </Button> */}
          </div>
        );
      },
    },
  ];
  const [payloadGet, setPayloadGet] = useState({
    params: {
      pageIndex: 1,
      isAdmin: true,
    },
  });
  const {
    data: listSongs,
    refetch: refetchSongs,
    isFetching: fetchingSongs,
    isLoading: loadingSongs,
  } = useQuery(['list_songs', null], () => getListSong(payloadGet), {
    refetchOnWindowFocus: false,
  });

  // const deleteSong = (id: number) => {
  //   setDeleteStatus(true);
  //   setIdPicked(id);
  // };
  const onOffSong = async (e: any, id: any) => {
    try {
      const payload = {
        songId: id,
        status: e?.target?.checked ? 1 : 0,
      };
      await updateSong(payload);
      refetchSongs();
    } catch (error: any) {
      message.error(error);
    }
  };

  return (
    <div className={styles.listAccount}>
      <div className={styles.search}>
        <Search
          placeholder="input search text"
          enterButton
          className={styles.searchInput}
        />
        <Button
          className={styles.btnAdd}
          onClick={() => history.push('/song/add')}>
          Add
        </Button>
      </div>
      <Spin spinning={loadingSongs || fetchingSongs}>
        <Table dataSource={listSongs} columns={columns} />
      </Spin>
      <DeleteSong
        deleteStatus={deleteStatus}
        setDeleteStatus={setDeleteStatus}
        idPicked={idPicked}
      />
    </div>
  );
}
