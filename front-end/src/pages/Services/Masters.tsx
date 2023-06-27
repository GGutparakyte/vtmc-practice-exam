import React, { useState } from 'react';
import styled from 'styled-components';
import { Row, Col, Modal, Input } from 'antd';
import { Field, Formik } from 'formik';
import { servicesValidationSchema } from './validationShema';

const StyledContainer = styled.div`
    padding: 16px;
    color: black;
`;
const StyledCol = styled(Col)`
    margin-bottom: 16px;
`;

const StyledButton = styled.button`
  background-color: #f2f2f2;
`;


const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 8px;
    border-bottom: 1px solid #ddd;
  }

  th {
    text-align: left;
    background-color: #f2f2f2;
  }
`;


interface Master {
  masterNameSurname: string;
  specialisation: string;
  city: string;
  service: string;
  rating: number; 
}

const  Masters = () => {
  const [mastersData, setMastersData] = useState<Master[]>([
    {
      masterNameSurname: 'Jonas Jonaitis',
      specialisation: 'Elektrikas',
      city: 'Vilnius',
      service: 'Servisas123',
      rating: 0, 
    },
  ]);
  const [newMaster, setNewMaster] = useState<Master>({
    masterNameSurname: '',
    specialisation: '',
    city: '',
    service: '',
    rating: 0, 
  });
  const [editingMasterIndex, setEditingMasterIndex] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [ratingInput, setRatingInput] = useState(0);
    
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMaster({
      ...newMaster,
      [e.target.name]: e.target.value,
    });
  };
    
  const handleAddMaster = () => {
    if (editingMasterIndex !== null) {
      // Update existing master
      const updatedMastersData = mastersData.map((master, index) =>
        index === editingMasterIndex ? newMaster : master,
      );
      setMastersData(updatedMastersData);
      setEditingMasterIndex(null);
    } else {
      // Add new master
      setMastersData([...mastersData, newMaster]);
    }
  
    // Reset input fields
    setNewMaster({
      masterNameSurname: '',
      specialisation: '',
      city: '',
      service: '',
      rating: 0,
    });
  };
  
    
  const handleEditMaster = (index: number) => {
    const selectedMaster = mastersData[index];
    setNewMaster(selectedMaster);
    setEditingMasterIndex(index);
  };
    
  const handleDeleteMaster = (index: number) => {
    const updatedMastersData = mastersData.filter((_, i) => i !== index);
    setMastersData(updatedMastersData);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleModal = () => {
    const updatedMastersData = mastersData.map((master, index) =>
      index === editingMasterIndex ? { ...master, rating: ratingInput } : master,
    );
    setMastersData(updatedMastersData);
  
    setIsModalVisible(false);
  };
  
  const handleModalCancel = () => {
    setIsModalVisible(false);
  };
  
  const handleRatingInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const ratingValue = parseFloat(e.target.value);
    setRatingInput(ratingValue);
  };
  

  return (
    <>
    <Modal
      title="Įvertinimas"
      open={isModalVisible}
      onOk={handleModal}
      onCancel={handleModalCancel}
    >
      <Input
        type="number"
        name="rating"
        value={ratingInput}
        onChange={handleRatingInputChange}
      />
    </Modal>
      <Table>
        <thead>
          <tr>
            <th>Darbuotojo Vardas, Pavardė</th>
            <th>Specializacija</th>
            <th>Miestas</th>
            <th>Servisas</th>
            <th>Įvertinimas</th>
            <th>Veiksmai</th>
          </tr>
        </thead>
        <tbody>
          {mastersData.map((master, index) => (
            <tr key={index}>
              <td>{master.masterNameSurname}</td>
              <td>{master.specialisation}</td>
              <td>{master.city}</td>
              <td>{master.service}</td>
              <td>{ratingInput}</td>
              <td>
                <button onClick={() => handleEditMaster(index)}>Edit</button>
                <button onClick={() => handleDeleteMaster(index)}>Delete</button>
                <button onClick={showModal}>Įvertinti</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Formik
      initialValues={newMaster}
      onSubmit={handleAddMaster}
      validationSchema={servicesValidationSchema}
      validateOnMount
    >
      <StyledContainer>
        <Row >
          <StyledCol span={24}>
            <Field
              name="masterNameSurname"
              label="Vardas Pavardė"
              placeholder="Vardas Pavardė"
              value={newMaster.masterNameSurname}
              onChange={handleInputChange}
            />
          </StyledCol>
          <StyledCol span={24}>
            <Field
              name="specialisation"
              label="Specializacija"
              placeholder="Specializacija"
              value={newMaster.specialisation}
              onChange={handleInputChange}
            />
          </StyledCol>
          <StyledCol span={24}>
            <Field
              name="city"
              label="Miestas"
              placeholder="Miestas"
              value={newMaster.city}
              onChange={handleInputChange}
            />
          </StyledCol>
          <StyledCol span={24}>
            <Field
              name="service"
              label="Servisas"
              placeholder="Servisas"
              value={newMaster.service}
              onChange={handleInputChange}
            />
          </StyledCol>
        </Row>
        <StyledButton onClick={handleAddMaster}> {editingMasterIndex !== null ? 'Atnaujinti meistro informaciją' : 'Pridėti meistrą'}</StyledButton>
      </StyledContainer>
      </Formik>
    </>
  );
};

export default Masters;
