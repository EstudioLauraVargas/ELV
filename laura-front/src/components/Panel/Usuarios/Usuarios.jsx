import style from './Usuarios.module.css'
import { useEffect, useState } from 'react';
import axios from "axios"
import toast, {Toaster} from "react-hot-toast"
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';

const Usuarios = ({find, createUser, editUser, users}) => {

  const [filterP, setFilterP] = useState()
  
  
  useEffect(() => {
    axios.get("/user")
    .then(({data}) => {setFilterP(data)})
  },[])

  useEffect(() => {
    setFilterP(users)
  },[users])
  
  // const reloadUser = () => {
  //   axios.get("/user")
  //   .then(({data}) => {setFilterP(data)})
  // }

  const [deleteId, setDeleteId] = useState()

  const options = {
    title: '¿Estás seguro?',
    message: 'Este proceso no se puede revertir',
    buttons: [
      {
        label: 'Si',
        onClick: () => deleteUser(deleteId)
      },
      {
        label: 'No',
        onClick: () => setDeleteId(null)
      }
    ],
    closeOnEscape: true,
    closeOnClickOutside: true,
    keyCodeForClose: [8, 32],
    willUnmount: () => {},
    afterClose: () => {},
    onClickOutside: () => {},
    onKeypress: () => {},
    onKeypressEscape: () => {},
    overlayClassName: "overlay-custom-class-name"
  };

  useEffect(() => {
    if(deleteId == null) return
    confirmAlert(options)
  },[deleteId])

  const deleteUser = async (id) => {
    await axios.delete("/user/"+id)
    alert("Eliminado con exito")
    axios.get("/user")
    .then(({data}) => {setFilterP(data)})
  }

  return(
    <>
    <Toaster position="top-center"/>
      <div className={style.pacientes}>
      <><h1>Usuarios</h1>
      {JSON.parse(localStorage.getItem("user")).role == 3 && <><button onClick={createUser} className={style.button}>Nuevo usuario</button> <br></br><br></br></>}
      {window.innerWidth < 1300 ? <Table className={style.tabla}>
      <Thead>
        <Tr>
          <Th className={style.topTd}>Nombres</Th>
          <Th className={style.topTd}>Rol</Th>
          <Th className={style.topTd}>Email</Th>
          <Th className={style.topTd}>Sede</Th>
          <Th className={style.topTd}>Comision</Th>
          {JSON.parse(localStorage.getItem("user")).role == 3 && <Th className={style.topTd}>Acciones</Th>}
        </Tr>
      </Thead>
      <Tbody>
        {filterP?.map((u) =>
          <Tr className={style.tr} onClick={() => editUser(u)}>
          <Td className={style.td}>{u.name} {u.lastname}</Td>
          <Td className={style.td}>{u.role == 1 && "Especialista"}{u.role == 2 && "Administrador"}{u.role == 3 && "Super admin"}{u.role == 4 && "Contador"}</Td>
          <Td className={style.td}>{u.email}</Td>
          <Td className={style.td}>{u.sede?.length == 1 && u.sede[0]}{u.sede?.length == 2 && `${u.sede[0]}, ${u.sede[1]}`}</Td>
          <Td className={style.td}>{u.comision}%</Td>
          {JSON.parse(localStorage.getItem("user")).role == 3 &&<Td className={style.td} onClick={() => {setDeleteId(u.id)}}>Borrar</Td>}
          </Tr>)}
      </Tbody>
    </Table>:<table className={style.tabla}>
          <tr>
          {/* <td className={style.topTd}>Fecha</td> */}
          <td className={style.topTd}>Nombres</td>
          <td className={style.topTd}>Rol</td>
          <td className={style.topTd}>Email</td>
          <td className={style.topTd}>Sede</td>
          <td className={style.topTd}>Comision</td>
          {JSON.parse(localStorage.getItem("user")).role == 3 &&<td className={style.topTd}>Acciones</td>}
          </tr>
          {filterP?.map( u =>
          <tr className={style.tr} onClick={() => editUser(u)}>
          {/* <td className={style.td}>{u.date}</td> */}
          <td className={style.td}>{u.name} {u.lastname}</td>
          {!u.role && <Td className={style.td}>Indefinido</Td>}
          {u.role == 1 && <td className={style.td}>Especialista</td>}
          {u.role == 2 && <td className={style.td}>Administrador</td>}
          {u.role == 3 && <Td className={style.td}>Super admin</Td>}
          {u.role == 4 && <Td className={style.td}>Contador</Td>}
          <td className={style.td}>{u.email}</td>
          {u.sede?.length == 1 && <td className={style.td}>{u.sede[0]}</td>}
          {u.sede?.length == 2 && <td className={style.td}>{`${u.sede[0]}, ${u.sede[1]}`}</td>}
          <td className={style.td}>{u.comision}%</td>
          {JSON.parse(localStorage.getItem("user")).role == 3 &&<td className={style.td} onClick={() => {setDeleteId(u.id)}}>Borrar</td>}
          </tr>)}
        </table>}
    <br></br>
      </>
        <br></br>
      </div>
    </>
  )
};

export default Usuarios