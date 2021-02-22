var carrousel = Vue.component('carrousel', {
    props: {
        carrouselId: {
            default: ''
        },
        jsonChart: {
            default: [{}]
        }
    },
    data() {
        return {
            current: 0,
        };
    },
    template: `
        <div class="carrousel">
            <div class="container">
                <div v-for="chart in jsonChart" v-bind:class="'image image-' + carrouselId + chart.activeClass ">
                    <div v-bind:class="'chart_div chart_div-' + carrouselId"></div>
                </div>
                
                <template v-if="jsonChart.length > 0">
                    <a href="#" onclick="return false;" class="prev" v-on:click="prev">&#10094;</a>
                    <a href="#" onclick="return false;" class="next" v-on:click="next">&#10095;</a>
                </template>
                
                <div class="dots">
                    <span v-for="(chart, index) in jsonChart" v-bind:class="'dot dot-' + carrouselId + chart.activeClass" v-on:click="show(index)"></span>
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
            if (this.current > this.jsonChart.length - 1) {
                this.current = 0;
            }
            this.show(this.current);
        },
        prev: function () {
            this.current--;
            if (this.current < 0) {
                this.current = this.jsonChart.length - 1;
            }
            this.show(this.current);
        },
        initChart: function () {
            google.charts.load('current', { 'packages': ['corechart'] });
            google.charts.setOnLoadCallback(drawVisualization);

            const context = this;

            function drawVisualization() {
                let chart_divs = document.getElementsByClassName(`chart_div-${context.carrouselId}`);

                for (let i = 0; i < context.jsonChart.length; i++) {
                    var data = google.visualization.arrayToDataTable(context.jsonChart[i].data);
                    var chart = new google.visualization.ComboChart(chart_divs[i]);

                    context.jsonChart[i].options.vAxis = { title: "" };
                    context.jsonChart[i].options.hAxis = { title: "" };
                    context.jsonChart[i].options.seriesType = "bars";
                    context.jsonChart[i].options.series = { 1: { type: "line" } };
                    
                    chart.draw(data, context.jsonChart[i].options);
                }
            }
        }
    },
    updated() {
        this.initChart();
    }
});

export default carrousel;