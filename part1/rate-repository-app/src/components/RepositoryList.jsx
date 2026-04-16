import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useState } from 'react';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { Picker } from '@react-native-picker/picker';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

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

export const RepositoryListContainer = ({ repositories, sort, setSort }) => {
  
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
      ListHeaderComponent={<PickSorting sort={sort} setSort={setSort}/>}
    />
  );
};

const RepositoryList = () => {
  const [sort, setSort] = useState('latest');
  const { repositories } = useRepositories(sort);

  return <RepositoryListContainer repositories={repositories} sort={sort} setSort={setSort}/>;
};

export default RepositoryList;




