package handler

import (
	"flonn-be/pkg/entity"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (h *handler) getAllOpenAction(ctx *gin.Context) {
	items, err := h.repo.OpenAction.GetAll()
	if err != nil {
		h.help.ErrorResponse(ctx, http.StatusInternalServerError, err.Error(), nil)
		return
	}

	h.help.SuccessResponse(ctx, http.StatusOK, "Retrieve successful", items)
}

func (h *handler) getOpenActionByID(ctx *gin.Context) {
	var bodyFilter struct {
		ID int `uri:"id"`
	}

	if err := h.help.BindParam(ctx, &bodyFilter); err != nil {
		h.help.ErrorResponse(ctx, http.StatusBadRequest, "failed to bind param", nil)
		return
	}

	items, err := h.repo.OpenAction.GetByID(bodyFilter.ID)
	if err != nil {
		h.help.ErrorResponse(ctx, http.StatusInternalServerError, err.Error(), nil)
		return
	}

	totalDonors, err := h.repo.OpenAction.CountDonors(bodyFilter.ID)
	if err != nil {
		h.help.ErrorResponse(ctx, http.StatusInternalServerError, "Failed to count donors", nil)
		return
	}

	sumDonations, err := h.repo.OpenAction.SumDonations(bodyFilter.ID)
	if err != nil {
		h.help.ErrorResponse(ctx, http.StatusInternalServerError, err.Error(), nil)
		return
	}

	var response = entity.OpenActionResponse{
		ID:            items.ID,
		Title:         items.Title,
		Subtitle:      items.Subtitle,
		Photo:         items.Photo,
		Description:   items.Description,
		Target:        items.Target,
		TotalDonors:   totalDonors,
		Location:      items.Location,
		StartDate:     items.StartDate,
		EndDate:       items.EndDate,
		Tasks:         items.Tasks,
		Condition:     items.Condition,
		IsDisaster:    items.IsDisaster,
		LogoOrganizer: items.LogoOrganizer,
		Coordinate:    items.Coordinate,
		TotalDonations: sumDonations,
		Capacity:      items.Capacity,
	}

	h.help.SuccessResponse(ctx, http.StatusOK, "Retrieve successful", response)
}

