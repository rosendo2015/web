import { Container } from "./styles"
import LogoExplorer from "../../assets/logoExplorer.svg"
import { Input } from "../../components/Input"
import { Button } from "../../components/Button"
import { LinkText } from "../../components/LinkText"
import { useState } from "react"
import {useNavigate} from "react-router-dom"
import { api } from "../../services/api"

export function SignUp() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

function handleSignUp(){
  if(!name || !email || !password){
    return alert("Preencha todos os campos.")
  }
  api.post("/users",{name, email, password}).then(()=>{
    alert("Usuário cadastrado com sucesso.")
    navigate("/")
  }).catch(error=>{
    if(error.response){
      alert(error.response.data.message)
    }else{
      alert("Não foi possível cadastrar.")
    }
  })
}
  return (
    <Container>
      <header>
        <img src={LogoExplorer} alt="logo" />
        <h1>food explorer</h1>
      </header>
      <form >
        <Input
          title="Seu nome"
          placeholder="Exemplo: Maria Silva"
          onChange={e => setName(e.target.value)}
          type="text"
          required
        />
        <Input
          title="Email"
          placeholder="Exemplo: exemplo@exemplo.com.br"
          onChange={e => setEmail(e.target.value)}
          type="email"
          required
          />
        <Input
          title="Senha"
          placeholder="No mínimo 6 caracteres"
          onChange={e => setPassword(e.target.value)}
          type="password"
          minlength="6"
          required
          />
        <Button
          title="Criar conta"
          type="submit"
          onClick={handleSignUp}
        />
      </form>
      <footer>
        <LinkText href="/" title="Já tenho uma conta" />
      </footer>
    </Container>
  )
}