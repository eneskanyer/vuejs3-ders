<template>
    <h1>Markalar</h1>


</template>


<script>
export default {
    data() {
        return {
            hello: null,
            products: [],
            error: null,
            baseUrl: "http://localhost:3001"
        };
    },

    mounted() {

    },

    watch: {

    },

    computed: {

    },

    methods: {

        //! async eklememizin nedeni içeride await kullandığımız için.  
        async getHello() {
            this.error = null;
            //! try içerisinde hata olursa catch kısmına atar. Bunu hata ayıklamada ve isteklerde hep kullanırız. 
            try {
                //! get isteğinde bulunduk. gelen cevabı(response) res değişkenine attık.
                const res = await fetch(`${this.baseUrl}/api/hello`);
                //! Eğer res değeri yoksa catch e fırlat. Hello endpoint hatası değeriyle. 
                if (!res.ok) throw new Error("Hello endpoint hatası");
                // gelen cevabı hello değişkenimize attık.
                this.hello = await res.json();
            } catch (e) {
                this.error = e.message;
            }
        },
        
        async getProducts() {
            this.error = null;
            try {
                const res = await fetch(`${this.baseUrl}/api/products`);
                if (!res.ok) throw new Error("Products endpoint hatası");
                this.products = await res.json();
            } catch (e) {
                this.error = e.message;
            }
        }
    }
};
</script>


<style scoped></style>