var home = Vue.component('home', {
    props: {

    },
    data() {
        return {
            Ids: [],
            ChartsMonterrey: [{}],
            ChartsTlalnepantla: [{}]
        };
    },
    template: `
        <div class="home">
            <navbar></navbar>

            <h1>Monterrey</h1>
            <carrousel v-bind:jsonChart="ChartsMonterrey" v-bind:carrouselId="Ids[0]"></carrousel>
            
            <h1>Tlalnepantla</h1>
            <carrousel v-bind:jsonChart="ChartsTlalnepantla" v-bind:carrouselId="Ids[1]"></carrousel>
        </div>
    `,
    methods: {
        createID: function (count) {
            for (let i = 0; i < count; i++) {
                this.Ids.push(guidGenerator());
            }
        },
        getCharts: function () {
            this.getChartsMonterrey();
            this.getChartsTlalnepantla();
        },
        getChartsMonterrey: function () {
            this.$http.get('/api/monterrey/get').then(
                res => {
                    console.log(res.body);
                    this.ChartsMonterrey = res.body;
                },
                err => {
                    console.log(err);
                }
            );
        },
        getChartsTlalnepantla: function () {
            this.$http.get('/api/tlalnepantla/get').then(
                res => {
                    console.log(res.body);
                    this.ChartsTlalnepantla = res.body;
                },
                err => {
                    console.log(err);
                }
            );
        }
    },
    mounted() {
        this.createID(2);
        this.getCharts();
    }
});

export default home;