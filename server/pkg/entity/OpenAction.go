package entity

import (
	"time"

	"gorm.io/gorm"
)

type OpenAction struct {
	gorm.Model
	Title         string    `json:"title"`
	Subtitle      string    `json:"subtitle"`
	Photo         string    `json:"photo"`
	Description   string    `json:"description"`
	IsDisaster    bool      `json:"is_disaster"`

	Location      string    `json:"location"`
	Coordinate    string    `json:"coordinate"`
	StartDate     time.Time `json:"start_date"`
	EndDate       time.Time `json:"end_date"`
	Capacity      int       `json:"capacity"`
	Tasks         string    `json:"tasks"`
	Condition     string    `json:"condition"`
	LogoOrganizer string    `json:"logo_organizer"`

	Target        float64   `json:"target"`
	TotalDonors   int64     `json:"total_donors"`
}

type OpenActionResponse struct {
	ID            uint      `json:"id"`

	Title         string    `json:"title"`
	Subtitle      string    `json:"subtitle,omitempty"`
	Photo         string    `json:"photo"`
	Description   string    `json:"description"`
	IsDisaster    bool      `json:"is_disaster"`

	Location      string    `json:"location,omitempty"`
	Coordinate    string    `json:"coordinate,omitempty"`
	StartDate     time.Time `json:"start_date,omitempty"`
	EndDate       time.Time `json:"end_date,omitempty"`
	Capacity      int       `json:"capacity,omitempty"`
	Tasks         string    `json:"tasks,omitempty"`
	Condition     string    `json:"condition,omitempty"`
	LogoOrganizer string    `json:"logo_organizer,omitempty"`

	Target        float64   `json:"target,omitempty"`
	TotalDonors   int64     `json:"total_donors,omitempty"`
	TotalDonations float64  `json:"total_donations,omitempty"`
}
