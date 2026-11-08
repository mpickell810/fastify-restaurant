import fp from 'fastify-plugin';
import fastifyMongo from '@fastify/mongodb';

async function datasourcePlugin (app, opts) {
    app.log.info('Connecting to MongoDB')
    await app.register(fastifyMongo, {
        url: 'mongodb://localhost:27017/restaurant' 
    });
    app.decorate('source', {
        async insertRecipe (recipe) {
            const { db } = app.mongo;
            const _id = new app.mongo.ObjectId();
            recipe._id = _id;
            recipe.id = _id.toString();
            const collection = db.collection('menu');
            const result = await collection.insertOne(recipe);
            
            return result.insertedId;
        },
        async readRecipes (filters, sort = { order: 1 }) {
            const collection = app.mongo.db.collection('menu');
            const result = await collection.find(filters).sort(sort).toArray();
            return result;
        },
        async deleteRecipe (recipeId) {
            const { db, ObjectId } = app.mongo;
            const collection = db.collection('menu');
            const result = await collection.deleteOne({ _id: new ObjectId(recipeId) });
            return result.deleteCount;
        },
        async insertOrder (order) { /* todo */ },
        async readOrders (filters, sort) { /* todo */ },
        async markOrdersAsDone (orderId) { /* todo */ }
    });
}
export default fp(datasourcePlugin);