import { FlatList, View, StyleSheet, Pressable, TextInput } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useState } from 'react';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { Picker } from '@react-native-picker/picker';
import theme from '../theme';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  input: {
    borderWidth: 2,
    borderColor: theme.colors.textSecondary,
    borderRadius: 3,
    padding: 6,
    paddingLeft: 10,
    margin: 5

  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const FilterInput = ({ filter, setFilter }) => {
  return (
    <TextInput 
      style={styles.input}
      value={filter}
      onChangeText={setFilter}
    />
  )
}

const PickSorting = ({ sort, setSort }) => {
  
  return (
    <Picker
      selectedValue={sort}
      onValueChange={(itemValue, itemIndex) => 
        setSort(itemValue)
      }
    
    >
      <Picker.Item label="latest repositories" value="latest" />
      <Picker.Item label="highest rated repositories" value="highest" />
      <Picker.Item label="lowest rated repositories" value="lowest" />
    </Picker>
  )
}

const Header = ({ sort, setSort, filter, setFilter }) => {
  return(
    <View>
      <FilterInput filter={filter} setFilter={setFilter}/>
      <PickSorting sort={sort} setSort={setSort}/>
    </View>
  )
}

export const RepositoryListContainer = ({ repositories, sort, setSort, filter, setFilter }) => {
  
  const navigate = useNavigate();
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item}) => (
        <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
          <RepositoryItem item={item}/>
        </Pressable>
        
      )}
      ListHeaderComponent={<Header sort={sort} setSort={setSort} filter={filter} setFilter={setFilter}/>}
    />
  );
};

const RepositoryList = () => {
  const [sort, setSort] = useState('latest');
  const [filter, setFilter] = useState('');
  const [debouncedFilter] = useDebounce(filter, 500)
  const { repositories } = useRepositories(sort, debouncedFilter);
  console.log(filter, 'filter')

  return <RepositoryListContainer repositories={repositories} sort={sort} setSort={setSort} filter={filter} setFilter={setFilter}/>;
};

export default RepositoryList;




