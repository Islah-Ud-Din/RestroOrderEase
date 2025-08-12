export const chartConfig = {
    pie: {
        labels: ['Opzelura', 'Abilify', 'Chlorthalidone', 'Zofran'],
        datasets: [
            {
                label: 'Sales',
                data: [300, 50, 80, 60],
                backgroundColor: ['#3F8CFF', '#B1E3FF', '#979797', '#00255B'],
                hoverOffset: 10,
                borderWidth: 2,
                borderRadius: 5,
                hoverBackgroundColor: ['#3F8CFF', '#B1E3FF', '#979797', '#00255B'],
            },
        ],
    },

    line: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Revenue',
                data: [80, 20, 90, 10, 45, 105, 110],
                borderColor: 'rgba(53, 162, 235, 1)',
                backgroundColor: 'rgba(53, 162, 235, 0.2)',
                borderWidth: 2,
                tension: 0.4,
                fill: true,
            },
            {
                label: 'Product A Revenue',
                data: [40, 30, 50, 60, 80, 70, 80],
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderWidth: 2,
                tension: 0.4,
                yAxisID: 'y1',
                fill: true,
            },
        ],
    },

    barOptions: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },

            title: {
                display: true,
                text: 'Monthly Sales Data (Bar Chart)',
                position: 'bottom',
            },
        },

        elements: {
            bar: {
                borderRadius: 10,
            },
        },
    },

    lineData: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Revenue',
                data: [80, 20, 90, 10, 45, 105, 110],
                borderColor: 'rgba(53, 162, 235, 1)',
                backgroundColor: 'rgba(53, 162, 235, 0.2)',
                borderWidth: 2,
                tension: 0.4, // Smooth lines
                fill: true,
            },

            {
                label: 'Product A Revenue',
                data: [40, 30, 50, 60, 80, 70, 80],
                borderColor: 'rgba(255, 99, 132, 1)', // Red color for Product A
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderWidth: 2,
                tension: 0.4,
                yAxisID: 'y1', // Matches the secondary y-axis
                fill: true,
            },
        ],
    },

    lineOptions: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Monthly Revenue Data (Line Chart)',
            },
        },
    },
};
