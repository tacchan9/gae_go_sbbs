package main

import (
	"time"
)

type Server struct {
	ServerName string
	ServerIP   string
}

type Serverslice struct {
	Servers []Server
}

type User struct {
	Name     string
	Role     string
	HireDate time.Time
}

type Post struct {
	Id    string `datastore:"-" goon:"id"`
	Title string
	Body  string
}

type Title struct {
	Id      string `datastore:"-" goon:"id"`
	Name    string
	Propose string
	User    string
	Update  time.Time
}

type Comment struct {
	Id      string `datastore:"-" goon:"id"`
	TitleId string
	Comment string
	User    string
	Update  time.Time
}

// for search
type CommentForSerh struct {
	TitleId string
	Comment string
	User    string
	//Update  time.Time
}

type CommentList struct {
	Comment   []Comment
	CursorKey string
}
type CommentForSerhList struct {
	Comment   []CommentForSerh
	CursorKey string
}
