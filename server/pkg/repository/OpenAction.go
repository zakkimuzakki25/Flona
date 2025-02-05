package repository

import (
	"flonn-be/pkg/entity"

	"gorm.io/gorm"
)

type OpenActionInterface interface {
	Create(openAction *entity.OpenAction) error
	GetByID(id int) (*entity.OpenAction, error)
	GetAll() ([]*entity.OpenAction, error)
	Update(openAction *entity.OpenAction) error
	Delete(id int) error
	CountDonors(actionID int) (int64, error)
	SumDonations(actionID int) (float64, error)
}

type openAction struct {
	db *gorm.DB
}

func OpenActionRepoInit(db *gorm.DB) OpenActionInterface {
	return &openAction{db: db}
}

func (r *openAction) Create(openAction *entity.OpenAction) error {
	if err := r.db.Create(openAction).Error; err != nil {
		return err
	}
	return nil
}

func (r *openAction) GetByID(id int) (*entity.OpenAction, error) {
	openAction := &entity.OpenAction{}
	if err := r.db.First(openAction, id).Error; err != nil {
		return nil, err
	}
	return openAction, nil
}

func (r *openAction) GetAll() ([]*entity.OpenAction, error) {
	var openActions []*entity.OpenAction
	if err := r.db.Find(&openActions).Error; err != nil {
		return nil, err
	}
	return openActions, nil
}

func (r *openAction) Update(openAction *entity.OpenAction) error {
	if err := r.db.Save(openAction).Error; err != nil {
		return err
	}
	return nil
}

func (r *openAction) Delete(id int) error {
	if err := r.db.Delete(&entity.OpenAction{}, id).Error; err != nil {
		return err
	}
	return nil
}

func (r *openAction) CountDonors(actionID int) (int64, error) {
	var count int64
	err := r.db.Model(&entity.Donation{}).
		Where("open_action_id = ?", actionID).
		Count(&count).Error
	if err != nil {
		return 0, err
	}
	return count, nil
}

func (r *openAction) SumDonations(actionID int) (float64, error) {
	var sum float64
	err := r.db.Model(&entity.Donation{}).
		Where("open_action_id = ?", actionID).
		Select("COALESCE(SUM(amount), 0)").
		Scan(&sum).
		Error
	if err != nil {
		return 0, err
	}
	return sum, nil
}
