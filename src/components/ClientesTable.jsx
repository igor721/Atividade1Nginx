import {
  MDBBtn,
  MDBIcon,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';

const ClientesTable = ({ clientes, setClientes }) => {
  const getClientes = (event) => {
    fetch('http://localhost:3000/clientes')
      .then((response) => response.json())
      .then((data) => {
        setClientes([...data]);
      })
      .catch((error) => {
        console.log('Deu erro!');
      });
  };
  
  useEffect(getClientes, []);

  const handleDelete = (id) => {
    //POST, PUT e DELETE
    fetch(`http://localhost:3000/clientes/${id}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          // Remover o cliente deletado da lista
          setClientes(clientes.filter((cliente) => cliente.id !== id));
        } else {
          console.error('Erro ao deletar o cliente.');
        }
      })
      .catch((error) => {
        console.error('Erro:', error);
      });
  };

  return (
    <>
      <MDBTable hover>
        <MDBTableHead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">E-mail</th>
            <th scope="col">Nascimento</th>
            <th scope="col">Cep</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {clientes.map((clientes, i) => {
            return (
              <tr key={i}>
                <td>{clientes.nome}</td>
                <td>{clientes.email}</td>
                <td>{clientes.nascimento}</td>
                <td>{clientes.cep}</td>
                <td>
                  <MDBBtn floating tag="a" className="mx-2" >
                    <MDBIcon fas icon="pen" />
                  </MDBBtn>

                  <MDBBtn 
                    floating tag="a" className="mx-2" color="danger" onClick={() => handleDelete(clientes.id)}>
                    <MDBIcon fas icon="trash-alt" />
                  </MDBBtn>
                </td>
              </tr>
            );
          })}
        </MDBTableBody>
      </MDBTable>
    </>
  );
};

export default ClientesTable;
