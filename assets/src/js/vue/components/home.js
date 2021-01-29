var home = Vue.component('home', {
    props: {

    },
    template: `
        <div class="home">
            <navbar></navbar>

            <h1>Monterrey</h1>
            <carrousel></carrousel>
            
            <h1>Tlalnepantla</h1>
            <carrousel></carrousel>
        </div>
    `,
    methods: {

    }
});

export default home;