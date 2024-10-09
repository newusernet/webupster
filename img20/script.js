
document.getElementById('appointment-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const service = document.getElementById('service').value;
    const description = document.getElementById('description').value;

    const serviceText = {
        'cabelo': 'Corte de Cabelo - R$30',
        'barba': 'Barba - R$20',
        'sobrancelha': 'Sobrancelha - R$15'
    };

    const message = `*Agendamento de Horário*\n\n*Nome:* ${name}\n*Telefone:* ${phone}\n*Data:* ${date}\n*Horário:* ${time}\n*Serviço:* ${serviceText[service]}\n*Descrição do Serviço:* ${description}`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=+5551998061961&text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');
});
