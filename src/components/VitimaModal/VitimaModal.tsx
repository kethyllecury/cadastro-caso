import React from 'react';
import {
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import InputField from '../common/InputField';
import OdontogramaInput from '../OdontogramaInput/OdontogramaInput';
import { Vitima } from '../../..';

interface VitimaModalProps {
  visible: boolean;
  onClose: () => void;
  vitima: Vitima;
  setVitima: React.Dispatch<React.SetStateAction<Vitima>>;
  onSave: () => void;
}

const regioesOdontograma: (keyof Vitima['odontograma'])[] = [
  'superiorEsquerdo',
  'superiorDireito',
  'inferiorEsquerdo',
  'inferiorDireito',
];

const VitimaModal: React.FC<VitimaModalProps> = ({ visible, onClose, vitima, setVitima, onSave }) => {
  const handleChange = (field: keyof Vitima, value: string) => {
    setVitima((prev) => ({ ...prev, [field]: value }));
  };

  const handleOdontogramaChange = (regiao: keyof Vitima['odontograma'], index: number, value: string) => {
    setVitima((prev) => {
      const novaRegiao = [...prev.odontograma[regiao]];
      novaRegiao[index] = value;
      return {
        ...prev,
        odontograma: {
          ...prev.odontograma,
          [regiao]: novaRegiao,
        },
      };
    });
  };

  const addOdontogramaItem = (regiao: keyof Vitima['odontograma']) => {
    setVitima((prev) => {
      const novaRegiao = [...prev.odontograma[regiao], ''];
      return {
        ...prev,
        odontograma: {
          ...prev.odontograma,
          [regiao]: novaRegiao,
        },
      };
    });
  };

  const removeOdontogramaItem = (regiao: keyof Vitima['odontograma'], index: number) => {
    setVitima((prev) => {
      const novaRegiao = prev.odontograma[regiao].filter((_, i) => i !== index);
      return {
        ...prev,
        odontograma: {
          ...prev.odontograma,
          [regiao]: novaRegiao,
        },
      };
    });
  };

  return (
    <Modal visible={visible} animationType="slide">
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Cadastrar Vítima</Text>

        <InputField label="CIN*" value={vitima.cin} onChangeText={(text) => handleChange('cin', text)} />
        <InputField label="Nome*" value={vitima.nome} onChangeText={(text) => handleChange('nome', text)} />
        <InputField label="Gênero" value={vitima.genero} onChangeText={(text) => handleChange('genero', text)} />
        <InputField
          label="Idade"
          value={vitima.idade}
          keyboardType="numeric"
          onChangeText={(text) => handleChange('idade', text)}
        />
        <InputField label="Documento" value={vitima.documento} onChangeText={(text) => handleChange('documento', text)} />
        <InputField label="Endereço" value={vitima.endereco} onChangeText={(text) => handleChange('endereco', text)} />
        <InputField label="Cor" value={vitima.cor} onChangeText={(text) => handleChange('cor', text)} />

        {regioesOdontograma.map((regiao) => (
          <OdontogramaInput
            key={regiao}
            regiao={regiao}
            items={vitima.odontograma[regiao]}
            onChange={(index, value) => handleOdontogramaChange(regiao, index, value)}
            onAdd={() => addOdontogramaItem(regiao)}
            onRemove={(index) => removeOdontogramaItem(regiao, index)}
          />
        ))}

        <InputField
          label="Anotações do Odontograma"
          value={vitima.anotacoesOdontograma}
          multiline
          onChangeText={(text) => handleChange('anotacoesOdontograma', text)}
        />

        <View style={styles.buttonsRow}>
          <TouchableOpacity style={[styles.btn, styles.cancelBtn]} onPress={onClose}>
            <Text style={styles.btnText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, styles.saveBtn]}
            onPress={() => {
              if (!vitima.nome || !vitima.cin) {
                Alert.alert('Erro', 'Nome e CIN são obrigatórios.');
                return;
              }
              onSave();
            }}
          >
            <Text style={styles.btnText}>Salvar Vítima</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: 'white' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  btn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  cancelBtn: {
    backgroundColor: '#ccc',
  },
  saveBtn: {
    backgroundColor: '#28a745',
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default VitimaModal;
