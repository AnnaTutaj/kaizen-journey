import { Select } from 'antd';
import { useMemo } from 'react';
import { useUserProfile } from '@common/contexts/UserProfile/UserProfileContext';

const { Option } = Select;

const useSelectOptionTag = () => {
  const { userProfile } = useUserProfile();

  const selectOptionsTag = useMemo(() => {
    return userProfile.tags.map((tag) => <Option key={tag}>{tag}</Option>);
  }, [userProfile.tags]);

  return { selectOptionsTag };
};

export default useSelectOptionTag;
