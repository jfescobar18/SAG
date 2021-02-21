var home = Vue.component('home', {
    props: {
        
    },
    data() {
        return {
            Ids: []
        };
    },
    template: `
        <div class="home">
            <navbar></navbar>

            <h1>Monterrey</h1>
            <carrousel v-bind:carrouselId="Ids[0]"></carrousel>
            
            <h1>Tlalnepantla</h1>
            <carrousel v-bind:carrouselId="Ids[1]"></carrousel>
        </div>
    `,
    methods: {
        createID: function (count) {
            for (let i = 0; i < count; i++) {
                this.Ids.push(guidGenerator());
            }
        }
    },
    mounted() {
        this.createID(2);
    }
});

export default home;