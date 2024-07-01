import {useState} from 'react';
import {getAllDealers} from '../services';

const useApiservices = () => {
  const [userList, setUserList] = useState<any[]>([]);
  const [loading, setloading] = useState<boolean>(false);
  const fetchUserList = async (roleid: string) => {
    setloading(true);
    try {
      const response = await getAllDealers({roleid});
      console.log(response?.data?.data);
      setUserList(response?.data?.data);
      setloading(false);
    } catch (error) {
      console.error(error);
      setloading(false);
    }
  };

  return {
    userList,
    loading,
    fetchUserList,
  };
};

export default useApiservices;
