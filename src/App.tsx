import { useState } from 'react';
import './App.css';
import { ContaBancaria } from './models/ContaBancaria';

function App() {
  const [conta] = useState(new ContaBancaria());
  const [valor, setValor] = useState<number>(0);
  const [operacao, setOperacao] = useState<'deposito' | 'saque'>('deposito');
  const [saldo, setSaldo] = useState<number>(conta.verSaldo());
  const [erro, setErro] = useState<string>(''); // 🛑 Mensagem de erro

  const realizarOperacao = () => {
    setErro(''); // Limpa mensagens anteriores

    if (valor <= 0) {
      setErro('O valor deve ser maior que zero.');
      return;
    }

    if (operacao === 'deposito') {
      conta.depositar(valor);
    } else {
      if (valor > conta.verSaldo()) {
        setErro('Saldo insuficiente para saque.');
        return;
      }
      conta.sacar(valor);
    }

    setSaldo(conta.verSaldo());
    setValor(0); // Limpa o campo
  };

  return (
      <div className="App">
    
      <h1>Banco Luiz Lindo</h1>
      <h2>Bem-vindo à sua conta bancária!</h2>
      <p>Gerencie suas finanças de forma simples e segura.</p>

      <h2>Saldo disponível: R$ {saldo}</h2>

      {erro && <p style={{ color: 'red', fontWeight: 'bold' }}>{erro}</p>} {/* 💬 Exibe erro */}

      <label>
        Escolha a operação:
        <select
          value={operacao}
          onChange={(e) => setOperacao(e.target.value as 'deposito' | 'saque')}
        >
          <option value="deposito">Depósito</option>
          <option value="saque">Saque</option>
        </select>
      </label>

      <br />

      <label>
        Valor:
        <input
          type="number"
          value={valor}
          onChange={(e) => setValor(Number(e.target.value))}
        />
      </label>

      <br />

      <button onClick={realizarOperacao}>Realizar operação</button>
    </div>
  );
}

export default App;
