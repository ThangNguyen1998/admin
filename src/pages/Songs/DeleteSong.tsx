import React from 'react';
import _ from 'lodash';
import styles from './styles.module.scss';
import { useTranslation } from 'react-i18next';
import { Modal } from 'antd';

export default function DeleteSong(props: any) {
  const { t } = useTranslation();
  const { deleteStatus, setDeleteStatus, idPicked } = props;
  const actionDelete = () => {
    setDeleteStatus(false);
  };

  return (
    <Modal
      title="Delete song"
      visible={deleteStatus}
      onCancel={() => setDeleteStatus(false)}
      onOk={() => actionDelete()}>
      <p>Do you wanna delete this song</p>
    </Modal>
  );
}
