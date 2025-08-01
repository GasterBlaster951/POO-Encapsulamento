import { useState } from 'react';
import './App.css';
import { ContaBancaria } from './models/ContaBancaria';

type Transacao = {
  tipo: 'Depósito' | 'Saque';
  valor: number;
  data: string;
};

function App() {
  const [conta] = useState(new ContaBancaria());
  const [valor, setValor] = useState<number>(0);
  const [operacao, setOperacao] = useState<'deposito' | 'saque'>('deposito');
  const [saldo, setSaldo] = useState<number>(conta.verSaldo());
  const [erro, setErro] = useState<string>('');
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);

  const realizarOperacao = () => {
    setErro('');

    if (valor <= 0) {
      setErro('O valor deve ser maior que zero.');
      return;
    }

    const tipo = operacao === 'deposito' ? 'Depósito' : 'Saque';
    const dataAtual = new Date().toLocaleString('pt-BR');

    if (operacao === 'deposito') {
      conta.depositar(valor);
    } else {
      if (valor > conta.verSaldo()) {
        setErro('Saldo insuficiente para saque.');
        return;
      }
      conta.sacar(valor);
    }

    setTransacoes(prev => [...prev, { tipo, valor, data: dataAtual }]);
    setSaldo(conta.verSaldo());
    setValor(0);
  };

  return (
    <div className="App">
      <h1>Banco Luiz Lindo</h1>
      <h2>Bem-vindo à sua conta bancária!</h2>
      <p>Gerencie suas finanças de forma simples e segura.</p>

      <h2>Saldo disponível: R$ {saldo}</h2>

      {erro && <p style={{ color: 'red', fontWeight: 'bold' }}>{erro}</p>}

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

      <hr style={{ margin: '2rem 0', borderColor: '#00f2ff' }} />

      <h3>📋 Histórico de Transações</h3>
      {transacoes.length === 0 ? (
        <p>Nenhuma transação realizada ainda.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {transacoes.map((t, i) => (
            <li key={i} style={{ marginBottom: '0.5rem', color: t.tipo === 'Depósito' ? 'green' : 'red' }}>
  {t.tipo === 'Depósito' ? '📥' : '📤'} <strong>{t.tipo}</strong> de R$ {t.valor.toFixed(2)} em {t.data}
</li>

          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
