import { Spin } from 'antd';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { IGratitudeModel } from '@modules/Gratitude/models/GratitudeModel';
import GratitudeList from '../GratitudeList';
import { useIntl } from 'react-intl';
import Button from '@common/components/Button';
import { StyledFooter } from './styled';

interface IProps {
  gratitudes: IGratitudeModel[];
  headerText: string;
  getNextGratitudes: () => void;
  loading: boolean;
  moreGratitudes: boolean;
  removeGratitude: (id: string) => void;
  updateGratitude: (gratitude: IGratitudeModel) => void;
}

const GratitudeListScrolled: React.FC<IProps> = ({
  gratitudes,
  headerText,
  getNextGratitudes,
  loading,
  moreGratitudes,
  removeGratitude,
  updateGratitude
}) => {
  const intl = useIntl();

  return (
    <>
      {gratitudes && gratitudes.length ? (
        <>
          <InfiniteScroll
            pageStart={0}
            loadMore={getNextGratitudes}
            hasMore={!loading && moreGratitudes}
            initialLoad={false}
          >
            <GratitudeList
              gratitudes={gratitudes}
              headerText={headerText}
              removeGratitude={removeGratitude}
              updateGratitude={updateGratitude}
            />
          </InfiniteScroll>
          <StyledFooter>
            {!loading && moreGratitudes ? (
              <Button type="primary" onClick={getNextGratitudes}>
                {intl.formatMessage({ id: 'common.list.loadMore' })}
              </Button>
            ) : null}

            {loading ? <Spin size="large" /> : null}
          </StyledFooter>
        </>
      ) : null}
    </>
  );
};

export default GratitudeListScrolled;
