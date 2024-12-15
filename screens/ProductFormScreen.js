import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Alert, ActivityIndicator, Text } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

const ProductFormScreen = ({ route, navigation }) => {
    const product = route.params?.product || {};
    const [name, setName] = useState(product.name || '');
    const [description, setDescription] = useState(product.description || '');
    const [quantity, setQuantity] = useState(String(product.quantity || ''));
    const [photo, setPhoto] = useState(product.photo || '');
    const [loading, setLoading] = useState(false); // Estado para controle do carregamento

    // Função para abrir a galeria e selecionar uma imagem
    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setPhoto(result.assets[0].uri); // Caminho local da imagem
        }
    };

    // Função para fazer o upload da imagem no Cloudinary
    const uploadImage = async (localUri) => {
        const formData = new FormData();
        formData.append('file', {
            uri: localUri,
            name: 'photo.jpg',
            type: 'image/jpeg',
        });
        formData.append('upload_preset', 'my-photos'); // Nome do Upload Preset

        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/seu_cloud_name/image/upload', formData, {   // Substitua 'seu_cloud_name' pelo seu Cloud Name na Cloudinary
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return response.data.secure_url; // URL pública gerada pelo Cloudinary
        } catch (error) {
            console.error('Erro ao fazer upload da imagem:', error);
            Alert.alert('Erro', 'Não foi possível fazer o upload da imagem.');
            throw error;
        }
    };

    // Função para salvar o produto no backend
    const handleSubmit = async () => {
        setLoading(true);
        try {
            let imageUrl = photo;

            // Se a imagem for local, faz o upload e obtém a URL pública
            if (photo && photo.startsWith('file://')) {
                imageUrl = await uploadImage(photo);
            }

            const newProduct = { name, description, quantity: Number(quantity), photo: imageUrl };

            if (product._id) {
                await axios.put(`http://xxx.xxx.x.xxx:5000/api/products/${product._id}`, newProduct); // Coloque o IP do seu computador 'xxx.xxx.x.xxx'
            } else {
                await axios.post('http://xxx.xxx.x.xxx:5000/api/products', newProduct); // Coloque o IP do seu computador 'xxx.xxx.x.xxx'
            }

            navigation.navigate('ProductList', { refresh: true });
        } catch (error) {
            console.error('Erro ao salvar produto:', error.response?.data?.message || error.message);

            // Verifica o erro específico de duplicidade
            if (error.response?.data?.message.includes('nome')) {
                Alert.alert('Erro', 'Já existe um produto com este nome.');
            } else {
                Alert.alert('Erro', 'Ocorreu um erro ao salvar o produto.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Nome"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
            <TextInput
                placeholder="Descrição"
                value={description}
                onChangeText={setDescription}
                style={styles.input}
            />
            <TextInput
                placeholder="Quantidade"
                value={quantity}
                onChangeText={setQuantity}
                keyboardType="numeric"
                style={styles.input}
            />
            {photo ? <Image source={{ uri: photo }} style={styles.image} /> : null}
            <Button title="Selecionar Foto" onPress={pickImage} />

            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text style={styles.loadingText}>Salvando produto...</Text>
                </View>
            ) : (
                <Button title="Salvar" onPress={handleSubmit} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    input: { marginBottom: 10, padding: 10, borderWidth: 1, borderRadius: 5 },
    image: { width: 100, height: 100, marginBottom: 10 },
    loadingContainer: { marginTop: 20, alignItems: 'center' },
    loadingText: { marginTop: 10, fontSize: 16, color: '#0000ff' },
});

export default ProductFormScreen;
