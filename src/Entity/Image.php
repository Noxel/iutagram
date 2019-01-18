<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ImageRepository")
 * @ApiResource(
 *     collectionOperations={
 *          "post"={"denormalization_context"={"groups"={"post_image"}}}
 *     },
 *     itemOperations={
 *          "get"={"normalization_context"={"groups"={"get_image"}}},
 *          "delete",
 *     }
 * )
 */
class Image
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"get_image", "get_user"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"get_image", "get_user", "post_image"})
     */
    private $path;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"get_image", "post_image"})
     */
    private $text;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"get_image"})
     */
    private $date;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\ImageLike", mappedBy="image", orphanRemoval=true)
     */
    private $imageLikes;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="images")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"get_image", "post_image"})
     */
    private $owner;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Comment", mappedBy="image", orphanRemoval=true)
     * @Groups({"get_image"})
     */
    private $comments;

    /**
     * @Groups({"get_image", "get_user"})
     */
    public function getLike(){
        return count($this->imageLikes);
    }

    /**
     * @Groups({"get_user"})
     */
    public function getComment(){
        return count($this->comments);
    }

    public function __construct()
    {
        $this->imageLikes = new ArrayCollection();
        $this->comments = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPath(): ?string
    {
        return $this->path;
    }

    public function setPath(string $path): self
    {
        $this->path = $path;

        return $this;
    }

    public function getText(): ?string
    {
        return $this->text;
    }

    public function setText(?string $text): self
    {
        $this->text = $text;

        return $this;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    /**
     * @return Collection|ImageLike[]
     */
    public function getImageLikes(): Collection
    {
        return $this->imageLikes;
    }

    public function addImageLike(ImageLike $imageLike): self
    {
        if (!$this->imageLikes->contains($imageLike)) {
            $this->imageLikes[] = $imageLike;
            $imageLike->setImage($this);
        }

        return $this;
    }

    public function removeImageLike(ImageLike $imageLike): self
    {
        if ($this->imageLikes->contains($imageLike)) {
            $this->imageLikes->removeElement($imageLike);
            // set the owning side to null (unless already changed)
            if ($imageLike->getImage() === $this) {
                $imageLike->setImage(null);
            }
        }

        return $this;
    }


    public function getOwner(): ?User
    {
        return $this->owner;
    }

    public function setOwner(?User $owner): self
    {
        $this->owner = $owner;

        return $this;
    }

    /**
     * @return Collection|Comment[]
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }

    public function addComment(Comment $comment): self
    {
        if (!$this->comments->contains($comment)) {
            $this->comments[] = $comment;
            $comment->setImage($this);
        }

        return $this;
    }

    public function removeComment(Comment $comment): self
    {
        if ($this->comments->contains($comment)) {
            $this->comments->removeElement($comment);
            // set the owning side to null (unless already changed)
            if ($comment->getImage() === $this) {
                $comment->setImage(null);
            }
        }

        return $this;
    }


}
