const express=require('express')
const mercadoPago = require("mercadopago")
const app=express()

mercadoPago.configure({
    sandbox: true,
    access_token: "TEST-2904528706315955-042618-db50b195a271764990773104a9a8e5ac-234553027"
})

app.get("/",(req,res)=>{
    res.send("Ola Marinosky")
})

//Pagamentos
//id//codigo//pagador//status
//1//item.id//caldasppatrick@gmail.com//não foi pago

app.get("/pagar", async (req,res)=>{

    var id = "" + Date.now()
    var emaildoPagador = "patrickpedrazzi@gmail.com"

    var dados = {
        items:[
            item = {
                id: id,    //UUID && Data
                title:"2x videogames",
                quantity: 1,
                currency_id: 'BRL',
                unit_price: parseFloat(150)     //parseFLoat(req.body.product.preco)
            }
        ],
        payer:{
            email: emaildoPagador
        },
        external_reference: id,
    }

    try{
        var pagamento = await mercadoPago.preferences.create(dados)
        console.log(pagamento)
        // Banco.salvarPagamento({id:id, email: emailPagador})
        return res.redirect(pagamento.body.init_point)

    }catch(err){
        return res.send(err.message)
    }

})

app.post("/not",(req,res)=>{
    console.log(req.query)
    res.send("OK")
})

app.listen(22,(req,res)=>{
    console.log("Servidor rodando")
})