import { pgTable, integer, varchar, decimal, serial, pgEnum, timestamp } from "drizzle-orm/pg-core";

// Esto es para el status si es activo o inactivo
export const statusEnum =pgEnum('statusEnum',['active','inactive'])

import{min} from "drizzle-orm";

export const products = pgTable('products', {
    id: serial('id').primaryKey(),
    name: varchar('name', {length:255}).unique(),
    price: decimal('price',{min:0}).notNull(),
    status: statusEnum('status').default('active')
})

export const sales =pgTable('sales',{
    id: serial('id').primaryKey(),
    quantity: integer('quantity',{min:1}).notNull(),
    total: decimal('total',{min:0}).notNull(),
    status: statusEnum('status').default('active'),
    created_at: timestamp('create_at',{withtimezone:true}).defaultNow(),
    update_at: timestamp('update_at',{withtimezone:true}).defaultNow()
})

export const sales_details = pgTable('sales_datails',{
    id: serial('id').primaryKey(),
    product_id: integer('product_id').references(()=> products.id,
    {
        onUpdate:'cascade',onDelete:'no action'
    }),
    quantity: integer('quantity',{min:1}).notNull(),
    status: statusEnum('status').default('active'),
    created_at: timestamp('create_at',{withtimezone:true}).defaultNow(),
    update_at: timestamp('update_at',{withtimezone:true}).defaultNow(),
    sale_id:integer('sales_id').references(()=>sales.id,
    {
        onUpdate:'cascade',onDelete:'no action'
    })

})
