<template>
  <div class="entry-title d-flex justify-content-between p-2">
    <div>
        <span class="text-success fs-3 fw-bold">15</span>
        <span class="mx-1 fs-3">Julio</span>
        <span class="mx-2 fs-4 fw-light">2023, Jueves</span>
    </div>

    <div>
        <button class="btn btn-danger mx-2">
            Borrar
            <i class="fa fa-trash-alt"></i>
        </button>
        <button class="btn btn-primary mx-2">
            Subir foto
            <i class="fa fa-upload"></i>
        </button>
    </div>
  </div>
  <hr>
  <div class="d-flex flex-column px-3 h-75">
    <textarea placeholder="¿Qué sucedió hoy??"></textarea>
  </div>
  <fab icon="fa-save"></fab>
  <img 
    src="https://i0.wp.com/codigoespagueti.com/wp-content/uploads/2023/03/Kimetsu-no-Yaiba-Mitsuri-Kanroji-llega-a-la-aldea-de-los-herreros-con-este-cosplay.jpg?resize=1280%2C720&quality=80&ssl=1" 
    alt="entry-picture"
    class="img-thumbnail">
</template>

<script>
import { defineAsyncComponent } from 'vue'
export default {
components:{
    Fab: defineAsyncComponent(()=>import('../components/Fab.vue'))
}
}
</script>

<style lang="scss" scoped>
textarea{
    font-size:20px;
    border: none;
    height: 100%;

    &:focus{
        outline: none;
    }
}
img{
    width: 200px;
    position: fixed;
    bottom: 150px;
    right: 20px;
    box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
}
</style>>