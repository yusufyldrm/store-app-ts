import React from 'react'
import { Container } from './style';
import { Dropdown, TextInput } from 'components';
import { GoSearch as Icon } from 'react-icons/go';
import { HiOutlineXCircle } from 'react-icons/hi';
import { ICategory } from 'interfaces';

interface IFilterProps {
  setProducts: (products: any) => void;
  immutableProducts: any;
  searchCategory: {
    value: string;
  };
  setSearchCategory: (category: { value: string }) => void;
  searchName: string;
  setSearchName: (name: string) => void;
  categories: ICategory[];
};

const Filter: React.FC<IFilterProps> = React.memo(({
  setProducts,
  immutableProducts,
  searchCategory,
  setSearchCategory,
  searchName,
  setSearchName,
  categories
}) => {
  React.useEffect(() => {
    searchJob();
    // eslint-disable-next-line
  }, [immutableProducts, searchName, searchCategory.value]);

  React.useEffect(() => {
    if (categories.find(category => category.name === searchCategory.value)) {
      setSearchCategory({ value: searchCategory.value });
    } else {
      setSearchCategory({ value: 'All' });
    }
    // eslint-disable-next-line
  }, [searchCategory.value, categories]);

  const searchJob = () => {
    let result = [...immutableProducts];
    if (searchName) {
      result = [...result.filter(job => job.name.toLowerCase().includes(searchName.toLowerCase()))];
    }

    if (searchCategory.value === 'Others') {
      result = [...result.filter(job => !job.category || job.category === 'Others')];
    } else if (searchCategory.value !== 'All') {
      result = [...result.filter(job => job.category === searchCategory.value)];
    }

    setProducts(result);
  };

  return (
    <Container>
      <TextInput
        isResponsive={true}
        id={'product-name'}
        placeholder={'Search Product'}
        containerStyle={{ width: '70%', maxWidth: '500px' }}
        onChange={e => setSearchName(e.target.value)}
        value={searchName}
        leftIcon={() => <Icon size={'20px'} name={'Search'} />}
        rightIcon={() => searchName.length > 0 ? <HiOutlineXCircle size={'20px'} style={{ cursor: 'pointer' }} name={'Clear'} /> : null}
        rightIconClick={() => setSearchName('')}
      />

      <Dropdown
        key={'category'}
        options={[
          { value: 'All' },
          ...categories.map(category => ({ value: category.name }))
        ]}
        selected={searchCategory}
        change={e => setSearchCategory(e)}
        containerStyle={{ width: '20%', minWidth: '150px' }}
      />

    </Container>
  )
}, (prev, next) => {
  return prev.immutableProducts === next.immutableProducts &&
    prev.searchCategory.value === next.searchCategory.value &&
    prev.searchName === next.searchName;
});

export default Filter;
