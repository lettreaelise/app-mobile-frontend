import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import axios from 'axios';

const ProductDetailScreen = ({ route, navigation }) => {
    const { productId } = route.params;
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetchProductDetails();
    }, []);

    const fetchProductDetails = async () => {
        try {
            const response = await axios.get(`http://xxx.xxx.x.xxx:5000/api/products/${productId}`); // Coloque o IP do seu computador 'xxx.xxx.x.xxx'
            setProduct(response.data);
        } catch (error) {
            console.error('Erro ao buscar produto:', error);
        }
    };

    if (!product) {
        return (
            <View style={styles.loading}>
                <Text>Carregando...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{product.name}</Text>
            <Text>{product.description}</Text>
            <Text>Quantidade: {product.quantity}</Text>
            <Button
                title="Editar Produto"
                onPress={() => navigation.navigate('ProductForm', { product })}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, alignItems: 'center' },
    loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});

export default ProductDetailScreen;
