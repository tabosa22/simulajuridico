
function calcular() {
    const anoContrato = document.getElementById("anoContrato").value;
    const entrada = parseFloat(document.getElementById("entrada").value) || 0;
    const valorTotal = parseFloat(document.getElementById("valorTotal").value);
    const parcelas = parseInt(document.getElementById("parcelas").value);
    const valorParcela = parseFloat(document.getElementById("valorParcela").value);

    const resultadoDiv = document.getElementById("resultado");
    const linkWhatsApp = document.getElementById("linkWhatsApp");

    if (isNaN(valorTotal) || isNaN(parcelas) || isNaN(valorParcela)) {
        resultadoDiv.textContent = "Por favor, preencha todos os campos obrigatórios.";
        linkWhatsApp.style.display = "none";
        return;
    }

    const totalPago = parcelas * valorParcela + entrada;
    const taxaMensalAproximada = ((valorParcela * parcelas) / valorTotal - 1) / parcelas;
    const percentual = (taxaMensalAproximada * 100).toFixed(2);

    let analise = `📊 Análise do Financiamento:\n\n` +
                  `📅 Ano do contrato: ${anoContrato || "Não informado"}\n` +
                  `💰 Valor financiado: R$ ${valorTotal.toFixed(2)}\n` +
                  `💸 Entrada: R$ ${entrada.toFixed(2)}\n` +
                  `📆 Parcelas: ${parcelas} x R$ ${valorParcela.toFixed(2)}\n` +
                  `💳 Total a pagar: R$ ${totalPago.toFixed(2)}\n` +
                  `📈 Juros estimados: ${percentual}% ao mês\n\n`;

    if (taxaMensalAproximada > 0.015) {
        analise += "⚠️ Os juros estão acima do limite legal. Pode haver abuso.\n";
    } else {
        analise += "✅ Os juros parecem estar dentro do limite legal.\n";
    }

    analise += "\n🔎 Fale com um especialista para revisar o contrato.";

    resultadoDiv.textContent = analise.replace(/\n/g, "\n");

    const whatsappMsg = encodeURIComponent(analise.replace(/\n/g, "\n"));
    linkWhatsApp.href = `https://wa.me/5521995061084?text=${whatsappMsg}`;
    linkWhatsApp.style.display = "block";
}
