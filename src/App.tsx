import { useState } from 'react';
import './App.css';
import { ContaBancaria } from './models/ContaBancaria';

function App() {
  const [conta] = useState(new ContaBancaria());
  const [valor, setValor] = useState<number>(0);
  const [operacao, setOperacao] = useState<'deposito' | 'saque'>('deposito');
  const [saldo, setSaldo] = useState<number>(conta.verSaldo());

  const realizarOperacao = () => {
    if (operacao === 'deposito') {
      conta.depositar(valor);
    } else {
      conta.sacar(valor);
    }
    setSaldo(conta.verSaldo());
    setValor(0); // opcional: limpa o campo de valor após a operação
  };

  return (
    <div className="App">
      <h2>Saldo disponível: R$ {saldo}</h2>

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
