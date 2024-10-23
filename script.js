let pedidos = [];

document.getElementById('registrarPedido').addEventListener('click', function() {
    const nomeCliente = document.getElementById('nomeCliente').value;
    const checkboxes = document.querySelectorAll('#vagas input[type="checkbox"]');
    const horaEntrada = document.getElementById('horaEntrada').value;
    const horaSaida = document.getElementById('horaSaida').value;
    let vagasSelecionadas = [];
    let total = 0;

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            vagasSelecionadas.push(checkbox.value);
            const valorPorHora = parseInt(checkbox.value.split('- R$ ')[1].split('/')[0]); // Obtém o valor por hora
            total += valorPorHora * calcularTempo(horaEntrada, horaSaida); // Calcula o total baseado no tempo de permanência
        }
    });

    if (nomeCliente === "" || vagasSelecionadas.length === 0 || !horaEntrada || !horaSaida) {
        alert('Por favor, preencha o nome do cliente, selecione pelo menos uma vaga e insira os horários de entrada e saída.');
    } else {
        pedidos.push({ cliente: nomeCliente, vagas: vagasSelecionadas, entrada: horaEntrada, saida: horaSaida, total: total });
        document.getElementById('resultado').innerHTML = `
            <h2>Pedido Registrado</h2>
            <p>Cliente: ${nomeCliente}</p>
            <p>Vagas: ${vagasSelecionadas.join(', ')}</p>
            <p>Horário de Entrada: ${horaEntrada}</p>
            <p>Horário de Saída: ${horaSaida}</p>
            <p>Total: R$ ${total}</p>
        `;
    }
});

// Função para calcular o tempo de permanência em horas
function calcularTempo(entrada, saida) {
    const [hEntrada, mEntrada] = entrada.split(':').map(Number);
    const [hSaida, mSaida] = saida.split(':').map(Number);

    const entradaTotal = hEntrada * 60 + mEntrada; // Tempo de entrada em minutos
    const saidaTotal = hSaida * 60 + mSaida; // Tempo de saída em minutos

    return Math.max(0, (saidaTotal - entradaTotal) / 60); // Retorna o tempo em horas
}

document.getElementById('calcularTroco').addEventListener('click', function() {
    const valorRecebido = parseFloat(document.getElementById('valorRecebido').value);
    const totalPedido = pedidos.length > 0 ? pedidos[pedidos.length - 1].total : 0;

    if (valorRecebido < totalPedido) {
        document.getElementById('trocoResultado').innerText = 'Valor recebido insuficiente.';
    } else {
        const troco = valorRecebido - totalPedido;
        document.getElementById('trocoResultado').innerText = `Troco a ser devolvido: R$ ${troco.toFixed(2)}`;
    }
});
