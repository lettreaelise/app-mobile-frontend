
---

## **Documentação do Frontend**

```markdown
# Frontend - Aplicativo Mobile em React Native

Este é o frontend de um sistema de estoque de produtos, desenvolvido em **React Native**. O app permite que o usuário realize operações de **CRUD** e faça upload de imagens através da galeria do celular.

---

## **Tecnologias Utilizadas**

- **React Native**: Framework para desenvolvimento de aplicativos mobile.
- **Expo**: Ferramenta que facilita o desenvolvimento e teste do React Native.
- **Axios**: Biblioteca para realizar requisições HTTP.
- **expo-image-picker**: Biblioteca para selecionar imagens da galeria.
- **Cloudinary**: Serviço externo para armazenamento de imagens.

---

## **Funcionalidades**

- **CRUD de Produtos**:
  - Criar, visualizar, editar e excluir produtos.
  - Upload de imagem para o produto (armazenada no **Cloudinary**).

- **Validação**:
  - Não é possível salvar produtos com nomes duplicados.

- **Experiência do Usuário**:
  - Animação de carregamento ao salvar um produto.
  - Mensagem específica caso o produto já exista.

---

## **Pré-requisitos**

Antes de executar o frontend, você precisa ter:

1. **Node.js** instalado ([Download Node.js](https://nodejs.org/)).
2. **Expo CLI** instalado globalmente:
```bash
   npm install -g expo-cli
```
3. **Uma conta no Cloudinary** -- ([Acesse Cloudinary](https://cloudinary.com/home))


## **Configuração do projeto**

1. **Clone o repositório**
```bash
git clone <link-do-repositorio>
cd .\mobile-app\
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configurar o Cloudinary**

No arquivo ProductFormScreen.js, substitua as seguintes variáveis:

```JavaScript

const uploadImage = async (localUri) => {
    const formData = new FormData();
    formData.append('file', {
        uri: localUri,
        name: 'photo.jpg',
        type: 'image/jpeg',
    });
    formData.append('upload_preset', 'minhas_fotos'); // Nome do Upload Preset no Cloudinary

    const response = await axios.post('https://api.cloudinary.com/v1_1/seu_cloud_name/image/upload', formData);
    return response.data.secure_url; // URL pública
};

```

Substitua:

- minhas_fotos pelo nome do seu Upload Preset.
- seu_cloud_name pelo seu Cloud Name no Cloudinary.


4. **Execute o app**

```bash
    npx expo start
```

5. **Testar no celular**

- Baixe o app Expo Go no celular (disponível na Play Store ou App Store).
- Escaneie o QR Code exibido no terminal.

