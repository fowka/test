<?php

namespace App\Entity;

use App\Repository\DataRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: DataRepository::class)]
class Data
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $MATNR = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $ERSDA = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $MATKL = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $ERNAM = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $MTART = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $MAKTX = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMATNR(): ?string
    {
        return $this->MATNR;
    }

    public function setMATNR(string $MATNR): static
    {
        $this->MATNR = $MATNR;

        return $this;
    }

    public function getERSDA(): ?string
    {
        return $this->ERSDA;
    }

    public function setERSDA(string $ERSDA): static
    {
        $this->ERSDA = $ERSDA;

        return $this;
    }

    public function getMATKL(): ?string
    {
        return $this->MATKL;
    }

    public function setMATKL(string $MATKL): static
    {
        $this->MATKL = $MATKL;

        return $this;
    }

    public function getERNAM(): ?string
    {
        return $this->ERNAM;
    }

    public function setERNAM(string $ERNAM): static
    {
        $this->ERNAM = $ERNAM;

        return $this;
    }

    public function getMTART(): ?string
    {
        return $this->MTART;
    }

    public function setMTART(string $MTART): static
    {
        $this->MTART = $MTART;

        return $this;
    }

    public function getMAKTX(): ?string
    {
        return $this->MAKTX;
    }

    public function setMAKTX(string $MAKTX): static
    {
        $this->MAKTX = $MAKTX;

        return $this;
    }
}
