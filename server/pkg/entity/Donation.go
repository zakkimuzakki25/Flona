package entity

import "gorm.io/gorm"

type Donation struct {
	gorm.Model
	UserID        int     `json:"user_id"`
	OpenActionID  int     `json:"open_action_id"`
	Status        string  `json:"status" gorm:"default:'diproses'"`
	Amount        float64 `json:"amount"`
	PaymentMethod string  `json:"payment_method"`
}
