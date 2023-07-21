document.getElementById('inter_form').addEventListener('submit', function (e) {
    const d = document;
    d.getElementById('resultDiv').textContent = '';
    d.getElementById('myChart').textContent = '';
    e.preventDefault();
    let n = parseFloat(e.target[0].value),
        xf = parseFloat(e.target[1].value),
        x1 = parseFloat(e.target[2].value),
        y = e.target[3].value;
    let result;
    if (n % 2 == 0) {
        let h = (xf - x1) / n;
        let xarr = [x1];
        for (let i = 1; i <= n; i++) {
            xarr[i] = xarr[i - 1] + h;
        }
        let yarr = [];
        y = y.replaceAll('x', 'xarr[i]');
        for (let i = 0; i <= n; i++) {
            yarr[i] = eval(y);
        }
        let sum1 = 0;
        for (let i = 1; i < n; i = i + 2) {
            sum1 += yarr[i];
        }
        let sum2 = 0;
        for (let i = 2; i < n - 1; i = i + 2) {
            sum2 += yarr[i];
        }

        result = (h / 3) * (yarr[0] + 4 * sum1 + 2 * sum2 + yarr[n]);
        console.log(yarr);
    } else {
        result = 'El valor de "n" debe ser par';
    }

    let resultDiv = d.getElementById('resultDiv');
    let r;
    if (typeof result === 'string') {
        r = d.createTextNode(result);
    } else {
        grafico(y, xf, x1);
        r = d.createTextNode(`El resultado de la integral es ${result}`);
    }
    let p = d.createElement('P');
    p.appendChild(r);
    resultDiv.appendChild(p);
});

function grafico(f, ls, li) {
    const ctx = document.getElementById('myChart');

    let arrData = [];
    let j = 0;
    let xeje = [];
    f = f.replaceAll('xarr[i]', 'x');
    let arrData2;
    if (ls - li <= 2) {
        for (let i = li - 0.4; i <= ls + 0.4; i = i + 0.2) {
            let x = i;
            xeje[j] = i;
            arrData[j] = eval(f);
            j++;
        }
        arrData2 = [...arrData];
        arrData2[0] = NaN;
        arrData2[1] = NaN;
        arrData2[j - 2] = NaN;
        arrData2[j - 1] = NaN;
    } else if (ls - li < 1) {
        for (let i = li - 0.2; i <= ls + 0.2; i = i + 0.1) {
            let x = i;
            xeje[j] = i;
            arrData[j] = eval(f);
            j++;
        }
        arrData2 = [...arrData];
        arrData2[0] = NaN;
        arrData2[1] = NaN;
        arrData2[j - 2] = NaN;
        arrData2[j - 1] = NaN;
    } else {
        for (let i = li - 1; i <= ls + 1; i++) {
            let x = i;
            xeje[j] = i;
            arrData[j] = eval(f);
            j++;
        }
        arrData2 = [...arrData];
        arrData2[0] = NaN;
        arrData2[j - 1] = NaN;
    }

    if (window.grafica) {
        window.grafica.clear();
        window.grafica.destroy();
    }
    
    window.grafica = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xeje,
            datasets: [
                {
                    label: 'Area Definida',
                    data: arrData2,
                    tension: 0.1,
                    fill: true,
                },
                {
                    label: 'Grafica de la integral',
                    data: arrData,
                    borderWidth: 1,
                    tension: 0.1,
                    fill: false,
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
}
