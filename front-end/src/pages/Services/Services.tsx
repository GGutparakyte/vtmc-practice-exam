import React, { useState, useEffect } from 'react';
import { useFetch } from 'use-http/dist/esm';
import styled from 'styled-components';
import { Row, Col } from 'antd';
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


interface Service  {
  id:number;
  serviceName: string;
  serviceAddress: string;
  serviceCEO: string;
}

const Services = () => {
  const [serviceData, setServiceData] = useState<Service[]>([]);
  const [newService, setNewService] = useState<Service>({
    id: 0,
    serviceName: '',
    serviceAddress: '',
    serviceCEO: '',
  });
  const [editingServiceId, setEditingServiceId] = useState<number | null>(null);

  const { get: getServices } = useFetch(`${process.env.REACT_APP_BASE_URL}/api/services`, { method: 'GET' });
  const { post: addNewService } = useFetch(`${process.env.REACT_APP_BASE_URL}/api/services/newService`, { method: 'POST' });

  useEffect(() => {
    getServices().then((response: Service[]) => {
      setServiceData(response);
    });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewService({
      ...newService,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddService = () => {
    if (editingServiceId) {
      // Update existing service
      const updatedServiceData = serviceData.map((service) =>
        service.id === editingServiceId ? newService : service,
      );
      setServiceData(updatedServiceData);
    } else {
      // Add new service
      const newServiceData: Service = {
        ...newService,
        id: Date.now(), // Generate a unique ID
      };
  
      // Send new service data to the endpoint
      addNewService(newServiceData)
        .then((response: Service) => {
          // Update the service data state with the response
          setServiceData([...serviceData, response]);
  
          // Reset input fields
          setNewService({
            id: 0,
            serviceName: '',
            serviceAddress: '',
            serviceCEO: '',
          });
        })
        .catch((error) => {
          // Handle error if necessary
          console.error('Failed to add new service:', error);
        });
    }
  
    // Clear editing state
    setEditingServiceId(null);
  };
  

  const handleEditService = (service: Service) => {
    setNewService(service);
    setEditingServiceId(service.id);
  };

  const handleDeleteService = (service: Service) => {
    const updatedServiceData = serviceData.filter((s) => s.id !== service.id);
    setServiceData(updatedServiceData);
  };


  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Serviso Pavadinimas</th>
            <th>Serviso Adresas</th>
            <th>Service Direktorius</th>
            <th>Veiksmai</th>
          </tr>
        </thead>
        <tbody>
          {serviceData?.map((service, index) => (
            <tr key={index}>
              <td>{service.serviceName}</td>
              <td>{service.serviceAddress}</td>
              <td>{service.serviceCEO}</td>
              <td>
                <button onClick={() => handleEditService(service)}>Edit</button>
                <button onClick={() => handleDeleteService(service)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Formik
      initialValues={newService}
      onSubmit={handleAddService}
      validationSchema={servicesValidationSchema}
      validateOnMount
    >
      <StyledContainer>
        <Row >
          <StyledCol span={16}>
            <Field
              name="serviceName"
              label="Serviso Pavadinimas"
              placeholder="Serviso Pavadinimas"
              value={newService.serviceName}
              onChange={handleInputChange}
            />
          </StyledCol>
          <StyledCol span={16}>
            <Field
              name="serviceAddress"
              label="Serviso Adresas"
              placeholder="Serviso Adresas"
              value={newService.serviceAddress}
              onChange={handleInputChange}
            />
          </StyledCol>
          <StyledCol span={16}>
            <Field
              name="serviceCEO"
              label="Direktorius"
              placeholder="Direktorius"
              value={newService.serviceCEO}
              onChange={handleInputChange}
            />
          </StyledCol>
        </Row>
        <StyledButton onClick={handleAddService}>
            {editingServiceId !== null ? 'Atnaujinti servisą' : 'Pridėti servisą'}
      </StyledButton>
      </StyledContainer>
      </Formik>
    </>
  );
};

export default Services;
