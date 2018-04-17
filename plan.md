


##Rough Plan

#Family friendly Eating App

Users will be able to log in and leave reviews based around the family friendliness of a cafe/restaurant.

It will require 2 models, users and restaurants

Restaurants:

Name
Location
contact number
Cuisine
Family Friendly Rating
Food Rating
Tick boxes with high chairs available
Tick box of kids menu
tick box of entertainment
map

reviews?


Users
Name
email
password
info/biog?
reviews
children?


reviews
???


on sign up users can leave reviews OR if they are a restaurant can submit their restaurant















function albumsUpdate(req, res){
  Album
    .findById(req.params.id)
    .exec()
    .then(album => {
      album = Object.assign(album, req.body);
      return album.save()
    })
    .then(album => res.redirect(`/albums/${album._id}`))
}

function albumsDelete(req, res){
  Album
    .findById(req.params.id)
    .exec()
    .then(album => album.remove())
    .then(() => res.redirect('/albums'));
}


module.exports = {
  index: albumsIndex,
  show: albumsShow,
  delete: albumsDelete,
  new: albumsNew,
  create: albumsCreate,
  edit: albumsEdit,
  update: albumsUpdate
};



router.route('/albums/:id')
  .get(albums.show)
  .delete(albums.delete)
  .put(albums.update);

router.route('/albums/:id/edit')
  .get(albums.edit);
//end resourse albums
