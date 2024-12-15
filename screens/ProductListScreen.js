import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Image } from 'react-native';
import axios from 'axios';

const ProductListScreen = ({ navigation }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchProducts();
        });

        return unsubscribe;
    }, [navigation]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://xxx.xxx.x.xxx:5000/api/products'); // Coloque o IP do seu computador 'xxx.xxx.x.xxx'
            setProducts(response.data);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://xxx.xxx.x.xxx:5000/api/products/${id}`); // Coloque o IP do seu computador 'xxx.xxx.x.xxx'
            fetchProducts();
        } catch (error) {
            console.error('Erro ao excluir produto:', error);
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text
                            style={styles.title}
                            onPress={() => navigation.navigate('ProductDetail', { productId: item._id })}
                        >
                            {item.name}
                        </Text>
                        <Text>{item.description}</Text>
                        <Text>Quantidade: {item.quantity}</Text>
                        {item.photo && <Image source={{ uri: item.photo }} style={styles.image} />}
                        <Button
                            title="Editar"
                            onPress={() => navigation.navigate('ProductForm', { product: item })}
                        />
                        <Button title="Excluir" onPress={() => handleDelete(item._id)} />
                    </View>
                )}
            />
            <Button title="Adicionar Produto" onPress={() => navigation.navigate('ProductForm')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    card: { marginBottom: 10, padding: 10, borderWidth: 1, borderRadius: 5 },
    title: { fontSize: 18, fontWeight: 'bold' },
    image: { width: 100, height: 100, marginTop: 10 },
});

export default ProductListScreen;
