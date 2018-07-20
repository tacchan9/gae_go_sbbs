package main

import (
	"encoding/json"
	"github.com/mjibson/goon"
	"github.com/zenazn/goji/web"
	"google.golang.org/appengine"
	"google.golang.org/appengine/datastore"
	"google.golang.org/appengine/log"
	"google.golang.org/appengine/search"
	"html/template"
	"net/http"
	"strconv"
)

func list(c web.C, w http.ResponseWriter, r *http.Request) {
	/*data := map[string]interface{}{
		"Name": "home",
	}*/
	//titles := []Title{}
	titles := make([]Title, 0)
	//titlesViews := make([]Title, 2)
	cc := appengine.NewContext(r)
	q := datastore.NewQuery("Title")
	count, err := q.Count(cc)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	titlesViews := make([]Title, count)

	g := goon.NewGoon(r)
	g.GetAll(q, &titles)

	ctx := newContext(r)

	for pos, title := range titles {
		log.Infof(ctx, "test:"+title.Name)
		log.Infof(ctx, "count:"+strconv.Itoa(pos))

		//member_views[pos].Id = keys[pos].IntID()
		//member_views[pos].Name = fmt.Sprintf("%s", member.Name)
		//member_views[pos].Gender = member.Gender
		titlesViews[pos].Id = title.Id
		titlesViews[pos].Name = title.Name
		titlesViews[pos].Propose = title.Propose
		titlesViews[pos].User = title.User
		log.Infof(ctx, "testok:")
	}
	log.Infof(ctx, "testok1:")

	/*data := map[string]interface{}{
		"Name":   "users/index",
		"Titles": titles,
	}*/

	//render("views/list.html", w, titlesViews)
	tmpl := template.Must(template.ParseFiles("views/layout.html", "views/list.html"))
	tmpl.Execute(w, titlesViews)

}

func searchMed(w http.ResponseWriter, r *http.Request) {
	ctx := newContext(r)
	log.Infof(ctx, "Index")

	// searchAPI
	index, err := search.Open("comment")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	var s CommentForSerhList

	for t := index.Search(ctx, "Comment="+r.FormValue("searchTxt"), nil); ; {
		var comment CommentForSerh
		_, err := t.Next(&comment)
		if err == search.Done {
			break
		}
		s.Comment = append(s.Comment, comment)

		/*if err != nil {
		          fmt.Fprintf(w, "Search error: %v\n", err)
		          break
		  }
		  fmt.Fprintf(w, "%s -> %#v\n", id, doc)*/

	}
	json.NewEncoder(w).Encode(s)
}
