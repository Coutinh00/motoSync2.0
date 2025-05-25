import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { Feather, MaterialIcons, AntDesign } from '@expo/vector-icons';

const areaTypes = [
  { id: '1', name: 'Maintenance Area', icon: 'wrench' },
  { id: '2', name: 'Sales Area', icon: 'shopping-bag' },
  { id: '3', name: 'Parking', icon: 'car' },
  { id: '4', name: 'Office/Admin', icon: 'user' },
  { id: '5', name: 'Storage/Warehouse', icon: 'archive' },
  { id: '6', name: 'Custom Area', icon: 'square' },
];

const CreateBranchLayoutScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  // Estado para o canvas e áreas no layout (placeholder)
  const [layoutAreas, setLayoutAreas] = useState([]);

  const handleClearCanvas = () => {
    console.log('Canvas limpo');
    setLayoutAreas([]);
  };

  const handleSaveLayout = () => {
    console.log('Layout salvo', layoutAreas);
    // Lógica para salvar o layout
  };

  const renderAreaTypeItem = ({ item }) => (
    <TouchableOpacity style={styles.areaTypeItem} onPress={() => console.log('Selecionou área:', item.name)}>
      <Feather name={item.icon} size={20} color="gray" style={styles.areaTypeIcon} />
      <Text style={styles.areaTypeText}>{item.name}</Text>
       <MaterialIcons name="drag-indicator" size={20} color="gray" />{/* Placeholder para indicador de arrastar */}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cria Layout da filial</Text>
        <View style={styles.headerIcons}>
           <Feather name="rotate-ccw" size={24} color="black" style={styles.headerIcon} />
           <Feather name="rotate-cw" size={24} color="black" style={styles.headerIcon} />
        </View>
      </View>

      {/* Canvas Section */}
      <View style={styles.canvasContainer}>
        {/* Grid representation (placeholder) */}
         <View style={styles.gridOverlay}>
           {[...Array(5)].map((_, rowIndex) => (
             <View key={rowIndex} style={styles.row}>
               {[...Array(5)].map((_, colIndex) => (
                 <View key={colIndex} style={styles.cell} />
               ))}
             </View>
           ))}
         </View>
        {/* Render layout areas here */}
        <Text style={styles.canvasPlaceholderText}>Arrastar os blocos do painel esquerdo para construir seu layout</Text>
      </View>

      {/* Canvas Action Buttons */}
      <View style={styles.canvasActionButtons}>
        <TouchableOpacity style={styles.clearCanvasButton} onPress={handleClearCanvas}>
          <Text style={styles.buttonText}>Limpar\nCanvas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveLayoutButton} onPress={handleSaveLayout}>
          <Text style={[styles.buttonText, styles.saveButtonText]}>Salvar\nLayout</Text>
        </TouchableOpacity>
      </View>

      {/* Areas Panel */}
      <View style={styles.areasPanel}>
        <View style={styles.areasHeader}>
          <Text style={styles.areasTitle}>Áreas</Text>
           <Feather name="search" size={20} color="gray" />{/* Search Icon */}
        </View>
         <View style={styles.areasSearchBarContainer}>
           <Feather name="search" size={16} color="gray" style={styles.searchIcon} />
           <TextInput
             style={styles.searchInput}
             placeholder="Pesquisar"
             value={searchText}
             onChangeText={setSearchText}
           />
         </View>
        <FlatList
          data={areaTypes}
          renderItem={renderAreaTypeItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.areaTypesList}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
   header: {
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent: 'space-between',
     paddingHorizontal: 10,
     paddingTop: 10,
     marginBottom: 10,
   },
   headerTitle: {
     fontSize: 20,
     fontWeight: 'bold',
   },
   headerIcons: {
     flexDirection: 'row',
   },
   headerIcon: {
     marginLeft: 15,
   },
  canvasContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
     overflow: 'hidden', // Garante que o grid não vaze
  },
   gridOverlay: {
     position: 'absolute',
     top: 0,
     left: 0,
     right: 0,
     bottom: 0,
     justifyContent: 'space-around',
     alignItems: 'space-around',
     padding: 20,
   },
   row: {
     flexDirection: 'row',
     justifyContent: 'space-around',
     flex: 1,
   },
   cell: {
     flex: 1,
     borderWidth: 0.5,
     borderColor: '#e0e0e0',
     margin: 1, // Pequena margem para visualização das linhas
   },
  canvasPlaceholderText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    padding: 20,
  },
  canvasActionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  clearCanvasButton: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '48%',
  },
  saveLayoutButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '48%',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
   saveButtonText: {
     color: 'white',
   },
  areasPanel: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
  },
  areasHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  areasTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
   areasSearchBarContainer: {
     flexDirection: 'row',
     alignItems: 'center',
     borderWidth: 1,
     borderColor: '#ccc',
     borderRadius: 5,
     paddingHorizontal: 10,
     marginBottom: 10,
   },
   searchIcon: {
     marginRight: 10,
   },
   searchInput: {
     flex: 1,
     height: 35,
   },
  areaTypesList: {
    // Pode adicionar padding aqui se necessário
  },
  areaTypeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
   areaTypeIcon: {
     marginRight: 10,
   },
  areaTypeText: {
    fontSize: 16,
    flex: 1,
  },
});

export default CreateBranchLayoutScreen; 