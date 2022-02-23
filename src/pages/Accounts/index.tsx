import React from 'react';
import _ from 'lodash';
import styles from './styles.module.scss';
import { useTranslation } from 'react-i18next';
import { Checkbox, Input, message, Spin, Table } from 'antd';
import { useMutation, useQuery } from 'react-query';
import { getListUser, updateUser } from 'api/accounts';

export default function Accounts() {
  const { t } = useTranslation();
  const { Search } = Input;
  // const [checkedValue, setCheckedValue] = useState([])

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text: any, record: any) => {
        const { status: userStatus } = record || {};
        return (
          <label className={`switch`}>
            <Checkbox
              className={`checkbox-custom`}
              checked={userStatus == 1}
              onChange={(e) => onOffUser(e, record?.userId)}>
              <span className={`slider`}></span>
            </Checkbox>
          </label>
        );
      },
    },
  ];

  const {
    data: listAccount,
    refetch: refetchAccounts,
    isLoading,
    isFetching,
  } = useQuery(['list_accounts', null], () => getListUser(), {
    refetchOnWindowFocus: false,
  });
  const onOffUser = async (e: any, id: any) => {
    try {
      const payload = {
        userId: id,
        status: e?.target?.checked ? 1 : 0,
      };
      await updateUser(payload);
      refetchAccounts();
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
      </div>
      <Spin spinning={isLoading || isFetching}>
        <Table dataSource={listAccount} columns={columns} pagination={false} />;
      </Spin>
    </div>
  );
}
