
function newFilme(){
    window.location.href = '../addFilme/addFilme.html';
}



findFilmes();

function findFilmes(){
    
    firebase.firestore()
        .collection('filmes_teste')
        .orderBy('idx', 'desc')
        .get()
        .then(snapshot => {
            
            const filmes = snapshot.docs.map(doc => ({
                ...doc.data(),
                uid: doc.id
            }));
            addFilme(filmes);
        })

}

//verificar as salas já cadastradas
var salaOcupada = []
//salaOcupada.push(filme.sala);
console.log(salaOcupada);
//export default salaOcupada;

function addFilme(filmes){
    const orderedList = document.getElementById('filmes')


    filmes.forEach(filme => {
        const li = document.createElement('li');
        
        //fazer com que cada item tenha o mesmo id da tela
        li.id = filme.uid;


        //Pegando o filme que foi clicado
        li.addEventListener('click', () => {
           window.location.href = '../addFilme/addFilme.html?uid=' + filme.uid; 
        })
        
        //botão de remover filme
        //const deleteButton = document.createElement('button');
        //deleteButton.innerHTML = "Remover";
        //deleteButton.classList.add('outline', 'danger');
        //deleteButton.addEventListener('click', event => {
            //event.stopPropagation();
            //askRemoveFilme(filme);
        //})
        //li.appendChild(deleteButton);




        //add id
        const idx = document.createElement('num');
        idx.innerHTML = (filme.idx);
        li.appendChild(idx);

        //add sala
        const sala = document.createElement('p');
        sala.innerHTML = (filme.sala);
        li.appendChild(sala);
        
        


        //add titulo
        const titulo = document.createElement('p');
        titulo.innerHTML = filme.titulo;
        li.appendChild(titulo);

        //add image
        const image = document.createElement('p');
        image.innerHTML = filme.image;
        li.appendChild(image);
        
        const png = document.createElement('p');
        png.innerHTML = filme.png;
        li.appendChild(png);

        //add sinopse
        const sinopse = document.createElement('p');
        sinopse.innerHTML = filme.sinopse;
        li.appendChild(sinopse);

        //add duracao
        const duracao = document.createElement('p');
        duracao.innerHTML = filme.duracao;
        li.appendChild(duracao);

        orderedList.appendChild(li);
    });
}

//Perguntar se quer realmente remover o filme
function askRemoveFilme(filme){
    const shouldRemove = confirm("Deseja remover o filme?");
    if (shouldRemove) {
        removeFilme(filme);
    }

}

//função que deleta o banco de dados
function removeFilme(filme){

    firebase.firestore()
        .collection('filmes_teste')
        .doc(filme.uid)
        .delete()
        .then(() => {
            document.getElementById(filme.uid).remove();
        })
        .catch(error => {
            console.log(error);
            alert('Erro ao remover filme');
        })

}


