import { Select } from 'antd';
import { useMemo } from 'react';
import { useAuth } from '@common/contexts/AuthContext';

const { Option } = Select;

const useSelectOptionTag = () => {
  const { userProfile } = useAuth();

  const selectOptionsTag = useMemo(() => {
    return userProfile.tags.map((tag) => <Option key={tag}>{tag}</Option>);
  }, [userProfile.tags]);

  return { selectOptionsTag };
};

export default useSelectOptionTag;
