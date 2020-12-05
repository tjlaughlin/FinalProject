package com.skilldistillery.crag.entities;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Event {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name="event_name")
	private String eventName;
	
	private String description;
	
	@Column(name = "img_url")
	private String imaUrl;
	
	@Column(name = "climbing_area_id")
	private int climbingAreaId;
	
	@Column(name = "event_date")
	private LocalDateTime eventDate;
	
//	@Column(name = "user_id")
//	private int userId;
	
	@Column(name = "created_at")
	private LocalDateTime createdAt;

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "created_by_user_id")
	private User createdBy;
	
	@ManyToMany(mappedBy = "attendedEvents")
	private List<User> attendedUsers;
	
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getImaUrl() {
		return imaUrl;
	}

	public void setImaUrl(String imaUrl) {
		this.imaUrl = imaUrl;
	}

	public int getClimbingAreaId() {
		return climbingAreaId;
	}

	public void setClimbingAreaId(int climbingAreaId) {
		this.climbingAreaId = climbingAreaId;
	}

	public LocalDateTime getEventDate() {
		return eventDate;
	}

	public void setEventDate(LocalDateTime eventDate) {
		this.eventDate = eventDate;
	}

	

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + id;
		return result;
	}
	
	@Override
	public String toString() {
		return "Event [id=" + id + ", eventName=" + eventName + ", description=" + description + ", imaUrl=" + imaUrl
				+ ", climbingAreaId=" + climbingAreaId + ", eventDate=" + eventDate + ", createdAt=" + createdAt
				+ ", createdBy=" + createdBy + "]";
	}

	

	public String getEventName() {
		return eventName;
	}

	public void setEventName(String eventName) {
		this.eventName = eventName;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Event other = (Event) obj;
		if (id != other.id)
			return false;
		return true;
	}

	
	public Event() {
		super();
	}

	public User getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(User createdBy) {
		this.createdBy = createdBy;
	}
	
}
