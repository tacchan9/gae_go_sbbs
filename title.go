package main

import (
	"encoding/json"
	"github.com/mjibson/goon"
	"github.com/zenazn/goji/web"
	"google.golang.org/appengine/log"
	"net/http"
	"time"
)

/*type Status struct {
	code string
	info []string
}*/
type Status struct {
	Id      string
	Balance string
}

func title(c web.C, w http.ResponseWriter, r *http.Request) {
	data := map[string]interface{}{
		"Name": "home",
	}
	render("views/title.html", w, data)
}

func titleCreate(w http.ResponseWriter, r *http.Request) {
	ctx := newContext(r)
	log.Infof(ctx, "Index")
	//fmt.Fprintf(w, "okok")

	//シーケンスにしたい

	g := goon.NewGoon(r)
	title := Title{Id: r.FormValue("input_text"), Name: r.FormValue("input_text"), Propose: r.FormValue("textarea1"), User: "test", Update: time.Now()}
	//post := Post{Title: "タイトル", Body: "本文です..."}

	//g.Put(&post)
	if _, err := g.Put(&title); err != nil {
		u := Status{Id: "ng", Balance: "ng"}
		json.NewEncoder(w).Encode(u)
		return
	}

	name := r.FormValue("input_text")
	info := r.FormValue("textarea1")
	u := Status{Id: name, Balance: info}
	json.NewEncoder(w).Encode(u)
}
