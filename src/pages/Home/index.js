import { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import styles from './styles';

export default function Home() {

    const [CEP, setCEP] = useState('');
    const [result, setResult] = useState(null);

    async function getDataCEP() {
        if(CEP) {
            await axios.get(`https://viacep.com.br/ws/${CEP}/json/`)
                .then(data => setResult(data.data))
                .catch(error => setResult('Error'));
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder='Insira um CEP'
                    value={CEP}
                    onChangeText={value => setCEP(value)}
                    />
                <TouchableOpacity style={styles.button} onPress={getDataCEP}>
                    <Text>Buscar CEP</Text>
                </TouchableOpacity>

            </View>
            <View style={styles.result}>
                {
                    result
                    ? 
                    <>
                        {
                        result === 'Error'
                        ?
                        <Text>Erro</Text>
                        :
                        <>
                            <Text>Bairro: {result.bairro}</Text>
                            <Text>CEP: {result.cep}</Text>
                            <Text>Complemento: {result.complemento}</Text>
                            <Text>DDD: {result.ddd}</Text>
                            <Text>LOCALIDADE: {result.localidade}</Text>
                            <Text>LOGRADOURO: {result.logradouro}</Text>
                            <Text>UF: {result.uf}</Text>
                        </>
                    }
                    </>
                    :
                    <Text>Sem resultado</Text>
                }
            </View>
        </View>
    );
}
