var carrousel = Vue.component('carrousel', {
    props: {
        carrouselId: {
            default: ''
        }
    },
    data() {
        return {
            current: 0,
            speed: 2000,
            play: null
        };
    },
    template: `
        <div class="carrousel">
            <div class="container">
                <div v-bind:class="'image image-' + carrouselId + ' active'">
                    <div v-bind:class="'chart_div chart_div-' + carrouselId"></div>
                </div>
                
                <div v-bind:class="'image image-' + carrouselId">
                    <div v-bind:class="'chart_div chart_div-' + carrouselId"></div>
                </div>
                
                <div v-bind:class="'image image-' + carrouselId">
                    <div v-bind:class="'chart_div chart_div-' + carrouselId"></div>
                </div>
                
                <div v-bind:class="'image image-' + carrouselId">
                    <div v-bind:class="'chart_div chart_div-' + carrouselId"></div>
                </div>
                
                <a href="#" onclick="return false;" class="prev" v-on:click="prev">&#10094;</a>
                <a href="#" onclick="return false;" class="next" v-on:click="next">&#10095;</a>
                
                <div class="dots">
                    <span v-bind:class="'dot dot-' + carrouselId + ' active'" v-on:click="show(0)"></span>
                    <span v-bind:class="'dot dot-' + carrouselId" v-on:click="show(1)"></span>
                    <span v-bind:class="'dot dot-' + carrouselId" v-on:click="show(2)"></span>
                    <span v-bind:class="'dot dot-' + carrouselId" v-on:click="show(3)"></span>
                </div>
            </div>
        </div>
    `,
    methods: {
        dots: function (n) {
            var ptn = document.getElementsByClassName(`dot-${this.carrouselId}`);
            for (let i = 0; i < ptn.length; i++) {
                if (ptn[i].className.includes("active")) {
                    ptn[i].className = ptn[i].className.replace("active", "");
                    break;
                }
            }
            ptn[n].className += " active";
        },
        show: function (n) {
            var imagenes = document.getElementsByClassName(`image-${this.carrouselId}`);
            for (let i = 0; i < imagenes.length; i++) {
                if (imagenes[i].className.includes("active")) {
                    imagenes[i].className = imagenes[i].className.replace("active", "");
                    break;
                }
            }
            this.current = n;
            imagenes[n].className += " active";
            this.dots(n);
        },
        next: function () {
            this.current++;
            if (this.current > 3) {
                this.current = 0;
            }
            this.show(this.current);
        },
        prev: function () {
            this.current--;
            if (this.current < 0) {
                this.current = 3;
            }
            this.show(this.current);
        },
        initChart: function () {
            google.charts.load('current', { 'packages': ['corechart'] });
            google.charts.setOnLoadCallback(drawVisualization);

            const context = this;

            function drawVisualization() {
                var data = google.visualization.arrayToDataTable([
                    ["SAG", "()", "% TARGET"],
                    ["ENE", 14.45, 10],
                    ["FEB", 0, 10],
                    ["MAR", 0, 10],
                    ["ABR", 0, 10],
                    ["MAY", 0, 10],
                    ["JUN", 0, 10],
                    ["JUL", 0, 10],
                    ["AGO", 0, 10],
                    ["SEP", 0, 10],
                    ["OCT", 0, 10],
                    ["NOV", 0, 10],
                    ["DIC", 0, 10],
                    ["2019", 14.45, 10]
                ]);

                var _data = google.visualization.arrayToDataTable([
                    ["SAG", "()", "% TARGET"],
                    ["ENE", 7, 5],
                    ["FEB", 0, 5],
                    ["MAR", 0, 5],
                    ["ABR", 0, 5],
                    ["MAY", 0, 5],
                    ["JUN", 0, 10],
                    ["JUL", 0, 10],
                    ["AGO", 0, 10],
                    ["SEP", 0, 10],
                    ["OCT", 0, 10],
                    ["NOV", 0, 10],
                    ["DIC", 0, 10],
                    ["2019", 7, 5]
                ]);

                var options = {
                    title: 'MTBF LINEA 2',
                    vAxis: { title: '' },
                    hAxis: { title: '' },
                    seriesType: 'bars',
                    series: { 1: { type: 'line' } }
                };

                var _options = {
                    title: 'MTBF LINEA 3',
                    vAxis: { title: '' },
                    hAxis: { title: '' },
                    seriesType: 'bars',
                    series: { 1: { type: 'line' } }
                };

                let chart_divs = document.getElementsByClassName(`chart_div-${context.carrouselId}`);

                var chart1 = new google.visualization.ComboChart(chart_divs[0]);
                chart1.draw(data, options);

                var chart2 = new google.visualization.ComboChart(chart_divs[1]);
                chart2.draw(_data, _options);

                var chart3 = new google.visualization.ComboChart(chart_divs[2]);
                chart3.draw(data, options);

                var chart4 = new google.visualization.ComboChart(chart_divs[3]);
                chart4.draw(_data, _options);
            }
        }
    },
    updated() {
        this.play = setInterval(this.next(), this.speed);
        this.initChart();
    }
});

export default carrousel;