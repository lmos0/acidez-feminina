document.getElementById('searchForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    document.getElementById('exportBtn').style.display = 'none';

    const company = document.getElementById('company').value.trim();
    const title1 = document.getElementById('title1').value.trim();
    const title2 = document.getElementById('title2').value.trim();

    if (!company || !title1) {
        alert("Por favor, preencha os campos obrigatórios.");
        return;
    }

    const tableBody = document.querySelector("#resultsTable tbody");
    tableBody.innerHTML = "";
    
    try {
        const response = await fetch(`http://localhost:3000/search?company=${encodeURIComponent(company)}&title1=${encodeURIComponent(title1)}&title2=${encodeURIComponent(title2)}`);
        
        if (!response.ok) {
            throw new Error("Erro na requisição ao servidor.");
        }

        const data = await response.json();

        if (data.length > 0) {
            data.forEach(item => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${item.title}</td>
                    <td><a href="${item.link}" target="_blank">${item.link}</a></td>
                `;
                tableBody.appendChild(row);
            });

            document.getElementById('exportBtn').style.display = 'block';
        } else {
            tableBody.innerHTML = "<tr><td colspan='2'>Nenhum resultado encontrado</td></tr>";
        }

        document.getElementById('result').style.display = 'block';
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        alert("Falha ao recuperar os resultados. Tente novamente mais tarde.");
    }
});

// Botão de exportação para CSV
document.getElementById('exportBtn').addEventListener('click', exportToCSV);

function exportToCSV() {
    const rows = Array.from(document.querySelectorAll('#resultsTable tbody tr'));
    const csvContent = [
        '"Título","Link"',
        ...rows.map(row => {
            const title = row.cells[0].textContent.replace(/"/g, '""');
            const link = row.cells[1].querySelector('a').href.replace(/"/g, '""');
            return `"${title}","${link}"`;
        })
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `LinkedIn_Profiles_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
