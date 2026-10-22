document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('supportForm');
    const queryInput = document.getElementById('query');
    const emailInput = document.getElementById('email');
    const feedbackMessage = document.getElementById('feedbackMessage');
    const responseBox = document.getElementById('responseBox');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const queryText = queryInput.value.trim();
        const emailText = emailInput.value.trim();

        if (!queryText) return;

        // Odeslání na Flask backend (pokud běží)
        try {
            fetch('/api/support', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: queryText, email: emailText })
            }).catch(() => {
                // Tichá chyba, pokud backend ještě neběží – JS kód funguje i frontendově
            });
        } catch (err) {
            console.log('Backend neodpovídá, používám pouze frontend.');
        }

        // Zobrazení vizuální zpětné vazby
        feedbackMessage.classList.remove('hidden');

        // Vytvoření dynamického obsahu odpovědi podpory
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        responseBox.classList.remove('empty');
        responseBox.innerHTML = `
            <div class="response-item">
                <div class="timestamp">Odesláno v ${timeStr}</div>
                <div class="status"><i class="fa-solid fa-clock"></i> Přijato v systému</div>
                <p><strong>Tvůj dotaz:</strong> "${escapeHtml(queryText)}"</p>
                ${emailText ? `<p style="margin-top: 4px; font-size: 0.85rem; color: #94a3b8;">Potvrzení bude zasláno na: ${escapeHtml(emailText)}</p>` : ''}
                <hr style="border: 0; border-top: 1px solid #334155; margin: 12px 0;">
                <p style="color: #38bdf8;"><i class="fa-solid fa-robot"></i> <strong>Podpora VDF Games:</strong> Ahoj! Tvůj požadavek jsme zaregistrovali. Náš tým se mu bude věnovat co nejdříve.</p>
            </div>
        `;

        // Vyčištění formuláře
        queryInput.value = '';
        emailInput.value = '';

        // Schování zeleného banneru po 5 sekundách
        setTimeout(() => {
            feedbackMessage.classList.add('hidden');
        }, 5000);
    });

    function escapeHtml(str) {
        return str.replace(/&/g, "&amp;")
                  .replace(/</g, "&lt;")
                  .replace(/>/g, "&gt;")
                  .replace(/"/g, "&quot;")
                  .replace(/'/g, "&#039;");
    }
});
